
import React, { PureComponent } from 'react'

import {
    StyleSheet,
    View,
    Text,
    Platform,
    TouchableOpacity,
    ScrollView,
    Image,
    RefreshControl,
    Alert
} from 'react-native'

import { Actions } from 'react-native-router-flux'
import IonIcons from 'react-native-vector-icons/Ionicons'
import * as commonColors from '../../styles/commonColors'
import * as commonStyles from '../../styles/commonStyles'
import { screenHeight, screenWidth } from '../../styles/commonStyles'

import Cache from '../../utils/cache'

const height = (Platform.OS === 'ios') ? 70 : 50

import gql from 'graphql-tag'
import { Query, withApollo } from 'react-apollo'

const myGames = gql`
    query myGames($keybaseid: String!) {
        allGames(condition:{
            keybaseid: $keybaseid
        })
        {
            nodes{
                id
                location
                dal
                locationLat
                locationLon
                info
                scheduledTime
                startedTime
                endedTime
                keybaseid
                invitesByGameId{
                    nodes{
                        gameId
                        keybaseid
                        accepted
                        disputed
                        cancelled
                        responded
                        userByKeybaseid {
                            imageUrl
                            about
                            accountid
                            rating
                            gender
                            handicap
                            age
                            location
                            fullName
                            keybaseid
                        }
                    }
                }
            }
        }
    }
`
const updateGame = gql`
    mutation updateGame($id: Int!, $startedTime: Datetime, $endedTime: Datetime){
        updateGameById (input: {id: $id, gamePatch: {
            startedTime: $startedTime
            endedTime: $endedTime
        }}) {
            game {
                id
                startedTime
                endedTime
            }
        }
    }
`

class MyGameList extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            countOfRents: 4,
            countOfTrans: 12,
            countOfSales: 25,
            name: 'Jacky Chan',
            email: 'itfox0905@gmail.com',
            keybaseId: 'jacky0905',
            header: 'Welcome to my profile!',

            location: 'China, Liaoning Shenyang',
            gender: 'Male',
            age: '36',
            stake: 3,
            handicap: 30,
            myGames: [
                { name: 'jacky chan', email: 'fox0905@oultook.com', players: 4, location: 'Golf Tokyo Japan', time: '12 June, 2018 10:30 AM', price: '3/12', status: 0 },
                { name: 'jacky chan', email: 'fox0905@oultook.com', players: 4, location: 'Golf Tokyo Japan', time: '12 June, 2018 10:30 AM', price: '3/12', status: 1 },
                { name: 'jacky chan', email: 'fox0905@oultook.com', players: 4, location: 'Golf Tokyo Japan', time: '12 June, 2018 10:30 AM', price: '3/12', status: 1 },
                { name: 'jacky chan', email: 'fox0905@oultook.com', players: 4, location: 'Golf Tokyo Japan', time: '12 June, 2018 10:30 AM', price: '3/12', status: 1 },
            ],
        }
    }

    close(id, cb) {
        let d = new Date()
        this.props.client.mutate({
            mutation: updateGame,
            variables: { id: id, startedTime: null, endedTime: d.toISOString() }
        }).then(res => {
            console.log(res)
            if (cb) cb(res)
        })
    }

    start(id, cb) {
        let d = new Date()
        this.props.client.mutate({
            mutation: updateGame,
            variables: { id: id, startedTime: d.toISOString(), endedTime: null }
        }).then(res => {
            console.log(res)
            if (cb) cb(res)
        })
    }

    startGame(id, cb) {
        Alert.alert(
            '',
            'Do you want to start the game?',
            [
                { text: 'Cancel', onPress: () => { }, style: 'cancel' },
                {
                    text: 'OK', onPress: () => {
                        this.start(id, (res) => {
                            // this.refetch()
                            if (cb) cb(res)
                        })
                    }
                },
            ],
            { cancelable: false }
        )
    }

    closeGame(id, cb) {
        Alert.alert(
            '',
            'Do you want to close the game?',
            [
                { text: 'Cancel', onPress: () => { }, style: 'cancel' },
                {
                    text: 'OK', onPress: () => {
                        this.close(id, (res) => {
                            // this.refetch()
                            if (cb) cb(res)
                        })
                    }
                },
            ],
            { cancelable: false }
        )
    }

    renderGameList() {
        return (
            <Query query={myGames} pollInterval={500} variables={{ keybaseid: Cache.currentUser.keybaseid }}>
                {({ loading, error, data }) => {
                    console.log(loading, error, data)
                    if (error) return <Error />
                    let myGames = []
                    if (loading == false) {
                        myGames = data.allGames.nodes
                    }
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
                                {myGames.length == 0 && <View style={{ width: '100%', height: screenHeight / 2, justifyContent: 'center', alignItems: 'center' }}>
                                    <IonIcons name="ios-document-outline" size={80} color={commonColors.textColor1} />
                                    <Text style={{ fontSize: 15, color: commonColors.textColor2 }}>No games yet</Text>
                                </View>}

                                {myGames.length > 0 &&
                                    <View style={{ padding: 15 }}>
                                        {myGames.map((item, index) => {
                                            let { invitesByGameId, scheduledTime } = item
                                            let { nodes } = invitesByGameId
                                            let accepted = []
                                            nodes.map((item) => {
                                                if (item.accepted) accepted.push(item)
                                            })
                                            return (
                                                <View key={index} activeOpacity={0.7} style={{
                                                    backgroundColor: 'white', shadowOpacity: 'black', shadowRadius: 2, width: '100%',
                                                    shadowOffset: { width: 1, height: 1 }, shadowOpacity: 0.4, borderRadius: 3, padding: 15, paddingBottom: item.startedTime == null ? 0 : 15, marginTop: 15
                                                }}>
                                                    <View style={{ flexDirection: 'row', }}>
                                                        {item.startedTime == null && <IonIcons name="ios-alarm" size={60} color={commonColors.theme} />}
                                                        {item.startedTime != null && <IonIcons name="md-close-circle" size={60} color={'rgb(200, 0, 29)'} />}
                                                        <View style={{ marginLeft: 10, overflow: 'hidden', flex: 1, justifyContent: 'center' }}>
                                                            <Text numberOfLines={1} style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>
                                                                {item.startedTime == null ? 'Upcoming...' : 'Closed'}</Text>
                                                            {/* <Text numberOfLines={1} style={{ fontSize: 13, color: '#555', marginTop: 8 }}>{item.email}</Text> */}
                                                        </View>
                                                        <Text style={{ fontSize: 15, color: '#999' }}>{accepted.length}/{nodes.length}</Text>
                                                    </View>
                                                    <View style={{ marginTop: 10 }}>
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <IonIcons name="md-pin" size={20} color={commonColors.theme} style={{ width: 20 }} />
                                                            <Text style={{ marginLeft: 8, color: 'grey' }}>{item.location}</Text>
                                                        </View>
                                                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                                            <IonIcons name="md-alarm" size={20} color={commonColors.theme} style={{ width: 20 }} />
                                                            <Text style={{ marginLeft: 8, color: 'grey' }}>{scheduledTime}</Text>
                                                        </View>
                                                        <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                                            <Text style={{ color: 'black', fontSize: 14 }}>DAL:</Text>
                                                            <Text style={{ marginLeft: 8, color: 'grey' }}>{item.dal}/{item.dal * accepted.length}</Text>
                                                            <View style={{ flex: 1 }} />
                                                            <TouchableOpacity onPress={() => Actions.GameDetail({ ...item, close: (id, cb) => this.closeGame(item.id, cb), start: (id, cb) => this.startGame(item.id, cb) })}>
                                                                <Text style={{ color: commonColors.theme, fontSize: 15 }}>View Detail</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                    {item.startedTime == null && <View style={{
                                                        height: 34, flex: 1, borderTopColor: '#aaa', borderTopWidth: 0.5, alignItems: 'center',
                                                        justifyContent: 'center', marginTop: 10, marginLeft: -15, marginRight: -15, backgroundColor: 'rgb(253,253,253)', flexDirection: 'row'
                                                    }}>
                                                        <TouchableOpacity onPress={() => this.startGame(item.id)} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                                            <Text style={{ color: commonColors.theme, fontSize: 13 }}>Start</Text>
                                                        </TouchableOpacity>
                                                        <View style={{ height: '100%', width: 1, backgroundColor: '#ccc' }} />
                                                        <TouchableOpacity onPress={() => this.closeGame(item.id)} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                                            <Text style={{ color: '#333', fontSize: 13 }}>Close</Text>
                                                        </TouchableOpacity>
                                                    </View>}
                                                </View>
                                            )
                                        })}
                                    </View>
                                }

                            </ScrollView>
                        </View>
                    )
                }}
            </Query>

        )
    }

    renderNavTitle() {
        return (
            <View style={{
                width: '100%', height: height, backgroundColor: commonColors.theme, justifyContent: 'center', alignItems: 'center',
                paddingTop: Platform.OS === 'ios' ? 20 : 0
            }}>
                <TouchableOpacity style={{ position: 'absolute', left: 15, top: 30 }} onPress={() => Actions.pop()}>
                    <IonIcons name="ios-arrow-back" color={'white'} size={30} />
                </TouchableOpacity>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Games organized by me</Text>
                </View>
            </View>
        )
    }



    render() {
        return (
            <View style={styles.container}>
                {this.renderNavTitle()}
                {this.renderGameList()}
            </View>
        )
    }
}

export default withApollo(MyGameList)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: commonColors.background
    }
})