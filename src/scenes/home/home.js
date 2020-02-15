'use strict';

import React, { PureComponent } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Animated,
    PermissionsAndroid,
    RefreshControl,
    Platform,
    ListView,
    StatusBar,
    Alert,
} from 'react-native';

import { Actions, ActionConst, Scene, Router } from 'react-native-router-flux';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import IonIcons from 'react-native-vector-icons/Ionicons'

import StarRatingBar from 'react-native-star-rating-view/StarRatingBar'

import * as commonColors from '../../styles/commonColors'
import * as commonStyles from '../../styles/commonStyles'
import { screenHeight, screenWidth } from '../../styles/commonStyles';
import Cache from '../../utils/cache'

import { Query, withApollo } from 'react-apollo'
import gql from 'graphql-tag'


const allInvites = gql`
    query allInvites($keybaseid: String!){
        allInvites(condition:{keybaseid:$keybaseid}){
            nodes{
                nodeId
                gameId
                accepted
                cancelled
                responded
                keybaseid
                id
                gameByGameId {
                    startedTime
                    endedTime
                    scheduledTime
                    dal
                    location
                    locationLat
                    locationLon
                    info
                    invitesByGameId {
                        totalCount
                        nodes {
                            accepted
                            keybaseid
                            responded
                            cancelled
                            disputed
                            userByKeybaseid {
                              about
                              rating
                              gender
                              imageUrl
                              fullName
                              handicap
                              keybaseid
                              location
                            }
                        }
                    }
                    walletByAccountid {
                        balance
                        accountid
                    }
                    keybaseid
                    userByKeybaseid {
                        keybaseid
                        handicap
                        rating
                        about
                        gender
                        imageUrl
                    }
                }
            }
        }
    }
`

const updateInvite = gql`
    mutation ($id: Int!, $responded: Boolean!, $accepted: Boolean!) {
        updateInviteById (input: {id: $id, invitePatch: {
            responded: $responded
            accepted: $accepted
        }}) 
        {
            invite {
                id
            }
        }
    }
`

class Home extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            index: 0,
            routes: [
                { key: '1', title: 'PAST' },
                { key: '2', title: 'UPCOMING' },
                { key: '3', title: 'INVITED' },
            ],
            createdGames: [],
            loading: true,
            avatar: Cache.currentUser.imageUrl ? { uri: Cache.currentUser.imageUrl } : commonStyles.userEmptyIcon
        };
    }

    accepted(id, cb){
        this.props.client.mutate({
            mutation: updateInvite,
            variables: {id: id, responded: true, accepted :true}
        }).then(res=>{
            if ( cb ) cb(res)
        })
    }

    decline(id, cb){
        this.props.client.mutate({
            mutation: updateInvite,
            variables: {id: id, responded: true, accepted :false}
        }).then(res=>{
            if ( cb ) cb(res)
        })
    }

    _handleIndexChange = index => this.setState({ index });

    _renderHeader = props =>
        <TabBar {...props}
            indicatorStyle={{ backgroundColor: commonColors.theme, width: 60, marginLeft: screenWidth / 4 - 60 }}
            labelStyle={{ color: commonColors.normalText, fontSize: 12.5, fontWeight: 'bold' }}
            style={styles.tabBar} />;

    renderPastGame(pastGames, loading) {
        return (
            <View style={{ flex: 1, width: screenWidth, backgroundColor: 'white' }}>
                <ScrollView style={{ backgroundColor: 'white' }}
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            onRefresh={() => { }}
                            tintColor={commonColors.theme}
                        />
                    }>
                    {pastGames.length == 0 && <View style={{ width: '100%', height: screenHeight / 2, justifyContent: 'center', alignItems: 'center' }}>
                        <IonIcons name="ios-document-outline" size={80} color={commonColors.textColor1} />
                        <Text style={{ fontSize: 15, color: commonColors.textColor2 }}>No games yet</Text>
                    </View>}


                    {pastGames.length > 0 &&
                        <View style={{ padding: 15 }}>
                            {pastGames.map((item, index) => {
                                let { rating, imageUrl } = item.gameByGameId.userByKeybaseid
                                let { location, scheduledTime, keybaseid, dal, invitesByGameId } = item.gameByGameId
                                let { totalCount, nodes } = invitesByGameId

                                let accepted = []
                                nodes.map((item) => {
                                    if (item.accepted) accepted.push(item)
                                })
                                return (
                                    <View key={index} activeOpacity={0.7} style={{
                                        backgroundColor: 'white', shadowOpacity: 'black', shadowRadius: 2, width: '100%',
                                        shadowOffset: { width: 1, height: 1 }, shadowOpacity: 0.4, borderRadius: 3, padding: 15, marginTop: 15
                                    }}>
                                        <View style={{ flexDirection: 'row', }}>
                                            <Image source={{ uri: imageUrl }} style={{ height: 40, width: 40, borderRadius: 20 }} />
                                            <View style={{ marginLeft: 10, overflow: 'hidden', flex: 1, justifyContent: 'center' }}>
                                                <Text numberOfLines={1} style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>{keybaseid}</Text>
                                                <View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>

                                                    <StarRatingBar
                                                        dontShowScore={true}
                                                        score={Number(rating)}
                                                        spacing={3}
                                                        readOnly={true}
                                                        // continuous={true}
                                                        allowsHalfStars={true}
                                                        accurateHalfStars={true}
                                                        starStyle={{
                                                            width: 12,
                                                            height: 12,
                                                        }}
                                                    />
                                                    <Text style={{ fontSize: 12, marginLeft: 5, width: 20 }}>{rating}</Text>
                                                </View>
                                                {/* <Text numberOfLines={1} style={{ fontSize: 13, color: '#555', marginTop: 8 }}>{item.email}</Text> */}
                                            </View>
                                            <Text style={{ fontSize: 15, color: '#999' }}>{accepted.length}/{invitesByGameId.totalCount}</Text>
                                        </View>
                                        <View style={{ marginTop: 10 }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <IonIcons name="md-pin" size={20} color={commonColors.theme} style={{ width: 20 }} />
                                                <Text style={{ marginLeft: 8, fontSize: 13, color: 'grey' }}>{location}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                                <IonIcons name="md-alarm" size={20} color={commonColors.theme} style={{ width: 20 }} />
                                                <Text style={{ marginLeft: 8, fontSize: 13, color: 'grey', marginTop: 2 }}>{scheduledTime}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                                <Text style={{ color: 'black', fontSize: 14 }}>DAL:</Text>
                                                <Text style={{ marginLeft: 8, color: 'grey' }}>{dal}/{dal * accepted.length}</Text>
                                                <View style={{ flex: 1 }} />
                                                <TouchableOpacity onPress={() => Actions.GameDetail({ ...item })}>
                                                    <Text style={{ color: commonColors.theme, fontSize: 15 }}>View Detail</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                )
                            })}
                        </View>
                    }
                </ScrollView>
                {/* {this.state.pastOrders.length == 0 && <TouchableOpacity activeOpacity={0.8} style={{
                    position: 'absolute', bottom: 0, backgroundColor: commonColors.theme,
                    height: 48, width: '100%', justifyContent: 'center', alignItems: 'center'
                }}>
                    <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>BROWSE RESTAURANTS</Text>
                </TouchableOpacity>} */}
            </View>
        )
    }

    renderUpcoming(upcomingGames, loading) {
        return (
            <View style={{ flex: 1, width: screenWidth, backgroundColor: 'white' }}>
                <ScrollView style={{ backgroundColor: 'white' }}
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            onRefresh={() => { }}
                            tintColor={commonColors.theme}
                        />
                    }>
                    {upcomingGames.length == 0 && <View style={{ width: '100%', height: screenHeight / 2, justifyContent: 'center', alignItems: 'center' }}>
                        <IonIcons name="ios-document-outline" size={80} color={commonColors.textColor1} />
                        <Text style={{ fontSize: 15, color: commonColors.textColor2 }}>No upcoming games</Text>
                    </View>}


                    {upcomingGames.length > 0 &&
                        <View style={{ padding: 15 }}>
                            {upcomingGames.map((item, index) => {
                                let { rating, imageUrl } = item.gameByGameId.userByKeybaseid
                                let { location, scheduledTime, keybaseid, dal, invitesByGameId } = item.gameByGameId
                                let { totalCount, nodes } = invitesByGameId

                                let accepted = []
                                nodes.map((item) => {
                                    if (item.accepted) accepted.push(item)
                                })
                                return (
                                    <View key={index} activeOpacity={0.7} style={{
                                        backgroundColor: 'white', shadowOpacity: 'black', shadowRadius: 2, width: '100%',
                                        shadowOffset: { width: 1, height: 1 }, shadowOpacity: 0.4, borderRadius: 3, padding: 15,
                                        marginTop: 15, paddingBottom: 0
                                    }}>
                                        <View style={{ flexDirection: 'row', }}>
                                            <Image source={{ uri: imageUrl }} style={{ height: 40, width: 40, borderRadius: 20 }} />
                                            <View style={{ marginLeft: 10, overflow: 'hidden', flex: 1, justifyContent: 'center' }}>
                                                <Text numberOfLines={1} style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>{keybaseid}</Text>
                                                <View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>

                                                    <StarRatingBar
                                                        dontShowScore={true}
                                                        score={Number(rating)}
                                                        spacing={3}
                                                        readOnly={true}
                                                        // continuous={true}
                                                        allowsHalfStars={true}
                                                        accurateHalfStars={true}
                                                        starStyle={{
                                                            width: 12,
                                                            height: 12,
                                                        }}
                                                    />
                                                    <Text style={{ fontSize: 12, marginLeft: 5, width: 20 }}>{rating}</Text>
                                                </View>
                                                {/* <Text numberOfLines={1} style={{ fontSize: 13, color: '#555', marginTop: 8 }}>{item.email}</Text> */}
                                            </View>
                                            <Text style={{ fontSize: 15, color: '#999' }}>{accepted.length}/{invitesByGameId.totalCount}</Text>
                                        </View>
                                        <View style={{ marginTop: 10 }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <IonIcons name="md-pin" size={20} color={commonColors.theme} style={{ width: 20 }} />
                                                <Text style={{ marginLeft: 8, fontSize: 13, color: 'grey' }}>{location}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                                <IonIcons name="md-alarm" size={20} color={commonColors.theme} style={{ width: 20 }} />
                                                <Text style={{ marginLeft: 8, fontSize: 13, color: 'grey', marginTop: 2 }}>{scheduledTime}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                                <Text style={{ color: 'black', fontSize: 14 }}>DAL:</Text>
                                                <Text style={{ marginLeft: 8, color: 'grey' }}>{dal}/{dal * accepted.length}</Text>
                                                <View style={{ flex: 1 }} />
                                                <TouchableOpacity onPress={() => Actions.GameDetail({ ...item, reject:(id, cb)=>this.rejectGame(id, cb) })}>
                                                    <Text style={{ color: commonColors.theme, fontSize: 15 }}>View Detail</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <TouchableOpacity onPress={() => this.rejectGame(item.id)} style={{
                                            height: 34, flex: 1, borderTopColor: '#aaa', borderTopWidth: 0.5, alignItems: 'center',
                                            justifyContent: 'center', marginTop: 10, marginLeft: -15, marginRight: -15, backgroundColor: 'rgb(253,253,253)'
                                        }}>
                                            <Text style={{ color: '#333', fontSize: 13 }}>Decline</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })}
                        </View>
                    }
                </ScrollView>
                {/* {this.state.upcomingOrders.length == 0 && <TouchableOpacity activeOpacity={0.8} style={{
                    position: 'absolute', bottom: 0, backgroundColor: commonColors.theme,
                    height: 48, width: '100%', justifyContent: 'center', alignItems: 'center'
                }}>
                    <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>BROWSE RESTAURANTS</Text>
                </TouchableOpacity>} */}
            </View>
        )
    }

    rejectGame(id, cb) {
        Alert.alert(
            '',
            'Do you want to cancel the game?',
            [
                { text: 'Cancel', onPress: () => { }, style: 'cancel' },
                { text: 'OK', onPress: () => { this.decline(id, (res)=>{
                    // this.refetch()
                    if ( cb ) cb(res)
                })} },
            ],
            { cancelable: false }
        )
    }

    acceptGame(id, cb){
        Alert.alert(
            '',
            'Do you want to accept the game?',
            [
                { text: 'Cancel', onPress: () => { }, style: 'cancel' },
                { text: 'OK', onPress: () => { 
                    this.accepted(id, (res)=>{
                        // this.refetch()
                        if ( cb ) cb(res)
                    })} 
                },
            ],
            { cancelable: false }
        )
    }

    renderInvited(invitedGames, loading) {
        return (
            <View style={{ flex: 1, width: screenWidth, backgroundColor: 'white' }}>
                <ScrollView style={{ backgroundColor: 'white' }}
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            onRefresh={() => { }}
                            tintColor={commonColors.theme}
                        />
                    }>
                    {invitedGames.length == 0 && <View style={{ width: '100%', height: screenHeight / 2, justifyContent: 'center', alignItems: 'center' }}>
                        <IonIcons name="ios-document-outline" size={80} color={commonColors.textColor1} />
                        <Text style={{ fontSize: 15, color: commonColors.textColor2 }}>No Invited games</Text>
                    </View>}


                    {invitedGames.length > 0 &&
                        <View style={{ padding: 15 }}>
                            {invitedGames.map((item, index) => {
                                let { rating, imageUrl } = item.gameByGameId.userByKeybaseid
                                let { location, scheduledTime, keybaseid, dal, invitesByGameId } = item.gameByGameId
                                let { totalCount, nodes } = invitesByGameId

                                let accepted = []
                                nodes.map((item) => {
                                    if (item.accepted) accepted.push(item)
                                })
                                return (
                                    <View key={index} activeOpacity={0.7} style={{
                                        backgroundColor: 'white', shadowOpacity: 'black', shadowRadius: 2, width: '100%',
                                        shadowOffset: { width: 1, height: 1 }, shadowOpacity: 0.4, borderRadius: 3, padding: 15,
                                        marginTop: 15, paddingBottom: 0
                                    }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image source={{ uri: imageUrl }} style={{ height: 40, width: 40, borderRadius: 20 }} />
                                            <View style={{ marginLeft: 10, overflow: 'hidden', flex: 1, justifyContent: 'center' }}>
                                                <Text numberOfLines={1} style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>{keybaseid}</Text>
                                                <View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>

                                                    <StarRatingBar
                                                        dontShowScore={true}
                                                        score={Number(rating)}
                                                        spacing={3}
                                                        readOnly={true}
                                                        // continuous={true}
                                                        allowsHalfStars={true}
                                                        accurateHalfStars={true}
                                                        starStyle={{
                                                            width: 12,
                                                            height: 12,
                                                        }}
                                                    />
                                                    <Text style={{ fontSize: 12, marginLeft: 5, width: 20 }}>{rating}</Text>
                                                </View>
                                                {/* <Text numberOfLines={1} style={{ fontSize: 13, color: '#555', marginTop: 8 }}>{item.email}</Text> */}
                                            </View>
                                            <Text style={{ fontSize: 15, color: '#999' }}>{accepted.length}/{invitesByGameId.totalCount}</Text>
                                        </View>
                                        <View style={{ marginTop: 10 }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <IonIcons name="md-pin" size={20} color={commonColors.theme} style={{ width: 20 }} />
                                                <Text style={{ marginLeft: 8, fontSize: 13, color: 'grey' }}>{location}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                                <IonIcons name="md-alarm" size={20} color={commonColors.theme} style={{ width: 20 }} />
                                                <Text style={{ marginLeft: 8, fontSize: 13, color: 'grey', marginTop: 2 }}>{scheduledTime}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                                <Text style={{ color: 'black', fontSize: 14 }}>DAL:</Text>
                                                <Text style={{ marginLeft: 8, color: 'grey' }}>{dal}/{dal * accepted.length}</Text>
                                                <View style={{ flex: 1 }} />
                                                <TouchableOpacity onPress={() => 
                                                    Actions.GameDetail({ ...item, reject:(id, cb)=>this.rejectGame(id, cb), accept:(id, cb)=>this.acceptGame(id, cb) })}>
                                                    <Text style={{ color: commonColors.theme, fontSize: 15 }}>View Detail</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View style={{
                                            height: 34, flex: 1, borderTopColor: '#aaa', borderTopWidth: 0.5, alignItems: 'center',
                                            justifyContent: 'center', marginTop: 10, marginLeft: -15, marginRight: -15, backgroundColor: 'rgb(253,253,253)', flexDirection: 'row'
                                        }}>
                                            <TouchableOpacity onPress={()=>this.acceptGame(item.id)} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                                <Text style={{ color: commonColors.theme, fontSize: 13 }}>Accept</Text>
                                            </TouchableOpacity>
                                            <View style={{ height: '100%', width: 1, backgroundColor: '#ccc' }} />
                                            <TouchableOpacity onPress={() => this.rejectGame(item.id)} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                                <Text style={{ color: '#333', fontSize: 13 }}>Decline</Text>
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                )
                            })}
                        </View>
                    }
                </ScrollView>
            </View>
        )
    }

    _renderScene({ route, pastGames, upcomingGames, invitedGames, loading }) {
        switch (route.key) {
            case '1':
                return this.renderPastGame(pastGames, loading)
                break
            case '2':
                return this.renderUpcoming(upcomingGames, loading)
                break
            case '3':
                return this.renderInvited(invitedGames, loading)
                break
            default:
                return null;
        }
    }

    createNewGame() {
        Actions.AddGame()
    }

    render() {
        return (
            <Query query={allInvites} pollInterval={500} variables={{ keybaseid: Cache.currentUser.keybaseid }}>
                {({ loading, error, data, refetch }) => {
                    this.refetch = refetch
                    if (error) <Error />
                    let pastGames = [], upcomingGames = [], invitedGames = [], currentGame
                    if (loading == false) {
                        data.allInvites.nodes.map((item, index) => {
                            if ( item.gameByGameId.keybaseid == Cache.currentUser.keybaseid ) return ;
                            if (!item.responded) invitedGames.push(item);
                            else if (item.accepted) {
                                if (item.startedTime == null) {
                                    upcomingGames.push(item)
                                } else {
                                    if (item.endedTime == null) {
                                        currentGame = item;
                                    } else {
                                        pastGames.push(item)
                                    }
                                }
                            }
                        })
                    }
                    return (
                        <View style={styles.container}>
                            <View style={{ flexDirection: 'row', height: 50, width: '100%', alignItems: 'center', justifyContent: 'center', borderBottomColor: '#ccc', borderBottomWidth: 0.5 }}>
                                <Text style={{ color: commonColors.theme, fontSize: 28, fontWeight: 'bold' }}>Lea</Text>
                                <Image source={commonStyles.logo} style={{ width: 70, height: 44 }} />
                                <Text style={{ color: commonColors.theme, fontSize: 28, fontWeight: 'bold' }}>gion</Text>

                                <TouchableOpacity onPress={() => this.createNewGame()} style={{ position: 'absolute', right: 20, top: 15 }}>
                                    <IonIcons name="ios-add-circle-outline" size={24} color={commonColors.theme} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => Actions.Profile()} style={{ position: 'absolute', left: 20, top: 10 }}>
                                    <Image source={this.state.avatar} style={{ height: 36, width: 36, borderRadius: 18 }} />
                                </TouchableOpacity>
                            </View>
                            <TabViewAnimated
                                style={styles.tabview}
                                navigationState={this.state}
                                renderScene={({ route }) => this._renderScene({ route, pastGames, upcomingGames, invitedGames, loading })}
                                renderHeader={this._renderHeader}
                                onIndexChange={this._handleIndexChange}
                            />
                        </View>
                    )
                }}
            </Query>
        )
    }

}

export default withApollo(Home)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
    },
    tabview: {
        flex: 1,
        backgroundColor: 'white',
    },
    tabBar: {
        backgroundColor: 'white'
    },

    textTitle: {
        color: commonColors.grayMoreText,
        fontSize: 14,
        padding: 10,
    },
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
