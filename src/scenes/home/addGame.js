
import React, { PureComponent } from 'react'

import {
    StyleSheet,
    View,
    Text,
    Platform,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Image,
    TextInput,
    Switch,
    Modal,
} from 'react-native'

import { Actions } from 'react-native-router-flux'
import IonIcons from 'react-native-vector-icons/Ionicons'
import MapView, { Marker } from 'react-native-maps'

import StarRatingBar from 'react-native-star-rating-view/StarRatingBar'

import DatePicker from 'react-native-datepicker'
import Cache from '../../utils/cache'

import * as commonColors from '../../styles/commonColors'
import * as commonStyles from '../../styles/commonStyles'

const height = (Platform.OS === 'ios') ? 70 : 50

import gql from 'graphql-tag';
import { graphql, Query, withApollo } from 'react-apollo';


const allUsers = gql`
    query {
        allUsers {
            nodes{
                nodeId
                location
                imageUrl
                about
                age
                keybaseid
                handicap
                accountid
                rating
                gender
                fullName
            }
        }
    }
`

const inviteGame = gql`
    mutation inviteGameID ($gameId: Int!, $keybaseid: String!) {
        createInvite (input: {invite: {
                gameId: $gameId
                keybaseid: $keybaseid
            }}) {
            invite {
                id
            }      
        }
        
    }
`

const getWallet = gql`
    query getWallet($accountid: String!) {
        walletByAccountid(accountid: $accountid){
            nodeId
        }
    }
`
const createGame1 = gql`
    mutation createGame($accountid: String!, $dal: Int!, $location: String!, $info: String!, $scheduledTime: Datetime!, $keybaseid: String! ) {
        createWallet (input: {wallet: {accountid: $accountid}}) { 
            wallet {
                accountid
            }
        }
        
        createGame (input: {game: {
                dal: $dal 
                location: $location
                info: $info
                scheduledTime: $scheduledTime
                accountid: $accountid
                keybaseid: $keybaseid
        }}) 
        {
            game {
                id
            }
        }
    }
`
const createGame2 = gql`
    mutation createGame($accountid: String!, $dal: Int!, $location: String!, $info: String!, $scheduledTime: Datetime!, $keybaseid: String! ) {    
        createGame (input: {game: {
                dal: $dal
                location: $location
                info: $info
                scheduledTime: $scheduledTime
                accountid: $accountid
                keybaseid: $keybaseid
        }}) 
        {
            game {
                id
            }
        }
    }
`

class AddGame extends PureComponent {
    constructor(props) {
        super(props)
        this.state = props.data;
        this.state = {
            location: '',
            dal: 0,
            scheduleTime: '',

            players: [
                { name: 'jacky chan', email: 'fox0905@oultook.com', players: 4, handicap: 11, location: 'Golf Tokyo Japan', time: '12 June, 2018 10:30 AM', price: 3, rating: 4 },
                { name: 'jacky chan', email: 'fox0905@oultook.com', players: 4, handicap: 18, location: 'Golf Tokyo Japan', time: '12 June, 2018 10:30 AM', price: 3, rating: 4 },
                { name: 'jacky chan', email: 'fox0905@oultook.com', players: 4, handicap: 43, location: 'Golf Tokyo Japan', time: '12 June, 2018 10:30 AM', price: 3, rating: 4 },
                { name: 'jacky chan', email: 'fox0905@oultook.com', players: 4, handicap: 3, location: 'Golf Tokyo Japan', time: '12 June, 2018 10:30 AM', price: 3, rating: 4 },
            ],
            invited: [],

            changed: true,
            showOptions: false,
            date: "2018-05-28",
            toggled: true,
            isMale: true,
            isFemale: false,
        }
    }

    invitePlayer(item, index) {
        this.state.invited.push(item)
        this.setState({ invited: [...this.state.invited] })
    }

    createGame() {
        this.props.client.query({
            query: getWallet,
            variables: { accountid: this.state.accountid }
        }).then((res) => {
            if (res.data.walletByAccountid == null) {
                this.props.client.mutate({
                    mutation: createGame1,
                    variables: {
                        accountid: this.state.accountid,
                        keybaseid: Cache.currentUser.keybaseid,
                        dal: this.state.dal,
                        location: this.state.location,
                        scheduledTime: this.state.scheduledTime,
                        info: this.state.info
                    }
                }).then((res) => {
                    this.state.invited.map((item) => {
                        this.props.client.mutate({
                            mutation: inviteGame,
                            variables: {
                                gameId: res.data.createGame.game.id,
                                keybaseid: item.keybaseid
                            }
                        }).then((res) => {
                            console.log('-----', res)
                        })
                    })
                    Actions.pop()

                })
            } else {
                this.props.client.mutate({
                    mutation: createGame2,
                    variables: {
                        accountid: this.state.accountid,
                        keybaseid: Cache.currentUser.keybaseid,
                        dal: this.state.dal,
                        location: this.state.location,
                        scheduledTime: this.state.scheduledTime,
                        info: this.state.info
                    }
                }).then((res) => {
                    this.state.invited.map((item) => {
                        this.props.client.mutate({
                            mutation: inviteGame,
                            variables: {
                                gameId: res.data.createGame.game.id,
                                keybaseid: item.keybaseid
                            }
                        }).then((res) => {
                            console.log('-----', res)
                        })
                    })
                    Actions.pop()

                })
            }
        })


    }

    renderPlayers() {
        if (this.state.players.length == 0) return null
        return (
            <View>
                <Query query={allUsers}>
                    {({ loading, error, data }) => {
                        console.log('----', loading, error, data)
                        if (loading) return <ActivityIndicator />
                        if (error) return <Text>Error ocurrs{error}</Text>

                        return data.allUsers.nodes.map((item, index) => {
                            if (this.state.invited.indexOf(item) >= 0) return;
                            return (
                                <View key={index} activeOpacity={0.7} style={{
                                    backgroundColor: 'white', shadowOpacity: 'black', shadowRadius: 2, width: '100%',
                                    shadowOffset: { width: 1, height: 1 }, shadowOpacity: 0.4, borderRadius: 3, padding: 15, marginTop: 15
                                }}>
                                    <View style={{ flexDirection: 'row', }}>
                                        <Image source={{ uri: item.imageUrl }} style={{ height: 40, width: 40, borderRadius: 20 }} />

                                        <View style={{ marginLeft: 10, overflow: 'hidden', flex: 1, justifyContent: 'center' }}>
                                            <Text numberOfLines={1} style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>{item.fullName}</Text>
                                            <View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>

                                                <StarRatingBar
                                                    dontShowScore={true}
                                                    score={Number(item.rating)}
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
                                                <Text style={{ fontSize: 12, marginLeft: 5, width: 20 }}>{Number(item.rating).toFixed(1)}</Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity onPress={() => this.invitePlayer(item, index)}>
                                            <Text style={{ fontSize: 14, color: commonColors.theme }}>Invite</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                        <Text style={{ fontSize: 14, color: '#333' }}>Handicap : </Text>
                                        <Text style={{ fontSize: 14, color: '#999' }}>{item.handicap} </Text>
                                        <Text style={{ fontSize: 14, color: 'black', marginLeft: 10 }}>{item.gender}</Text>
                                        <View style={{ flex: 1 }} />
                                        <TouchableOpacity onPress={() => Actions.PlayerDetail({ ...item })}>
                                            <Text style={{ color: commonColors.theme, fontSize: 14 }}>View Detail</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        })
                    }
                    }
                </Query>
            </View>
        )
    }

    filtering() {
        this.setState({ showOptions: true, changed: false })
    }

    renderFilteringModal() {
        return (
            <Modal visible={this.state.showOptions} onRequestClose={() => { }} animationType="slide">
                <View>
                    <View style={{
                        width: '100%', height: height, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center',
                        paddingTop: Platform.OS === 'ios' ? 20 : 0, borderBottomColor: '#ccc', borderBottomWidth: 0.5,
                    }}>
                        <TouchableOpacity style={{ position: 'absolute', left: 15, top: 26 }} onPress={() => this.setState({ showOptions: false })}>
                            <IonIcons name="ios-arrow-round-back" color={'#333'} size={40} style={{ height: 30 }} />
                        </TouchableOpacity>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>Filtering Options</Text>
                        </View>
                        {this.state.changed && <TouchableOpacity style={{ position: 'absolute', right: 15, top: 30 }} onPress={() => this.filterProcess()}>
                            <IonIcons name="ios-checkmark-circle" color={commonColors.theme} size={26} />
                        </TouchableOpacity>}
                    </View>
                    <View>
                        <View style={{ paddingHorizontal: 15, marginTop: 30 }}>
                            <Text style={{ fontSize: 12, color: commonColors.normalText }}>Location</Text>
                            <TextInput
                                placeholder="Location"
                                placeholderTextColor={commonColors.placeText}
                                autoCapitalize="none"
                                autoCorrect={false}
                                underlineColorAndroid="transparent"
                                style={{
                                    paddingHorizontal: 15,
                                    borderColor: commonColors.placeText, borderWidth: 1,
                                    height: 40, marginTop: 8,
                                }}
                                onChangeText={(text) => { this.setState({ changed: true }) }}
                            />
                        </View>
                        <View style={{ paddingHorizontal: 15, marginTop: 15 }}>
                            <Text style={{ fontSize: 12, color: commonColors.normalText }}>Name</Text>
                            <TextInput
                                placeholder="Name"
                                placeholderTextColor={commonColors.placeText}
                                autoCapitalize="none"
                                autoCorrect={false}
                                underlineColorAndroid="transparent"
                                style={{
                                    paddingHorizontal: 15,
                                    borderColor: commonColors.placeText, borderWidth: 1,
                                    height: 40, marginTop: 8,
                                }}
                                onChangeText={(text) => { this.setState({ changed: true }) }}
                            />
                        </View>
                        <View style={{ paddingHorizontal: 15, marginTop: 15 }}>
                            <Text style={{ fontSize: 12, color: commonColors.normalText }}>Handicap Range</Text>
                            <View style={{ marginTop: 8, flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput
                                    placeholder="Min."
                                    placeholderTextColor={commonColors.placeText}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    underlineColorAndroid="transparent"
                                    style={{
                                        paddingHorizontal: 15,
                                        borderColor: commonColors.placeText, borderWidth: 1,
                                        height: 40, flex: 1,
                                    }}
                                    onChangeText={(text) => { this.setState({ changed: true }) }}
                                />
                                <Text style={{ fontSize: 12, color: commonColors.normalText }}> to </Text>
                                <TextInput
                                    placeholder="Max."
                                    placeholderTextColor={commonColors.placeText}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    underlineColorAndroid="transparent"
                                    style={{
                                        paddingHorizontal: 15,
                                        borderColor: commonColors.placeText, borderWidth: 1,
                                        height: 40, flex: 1,
                                    }}
                                    onChangeText={(text) => { this.setState({ changed: true }) }}
                                />
                            </View>
                        </View>

                        <View style={{ paddingHorizontal: 15, marginTop: 15 }}>
                            <Text style={{ fontSize: 12, color: commonColors.normalText }}>Rating Range</Text>
                            <View style={{ marginTop: 8, flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput
                                    placeholder="Min."
                                    placeholderTextColor={commonColors.placeText}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    underlineColorAndroid="transparent"
                                    style={{
                                        paddingHorizontal: 15,
                                        borderColor: commonColors.placeText, borderWidth: 1,
                                        height: 40, flex: 1,
                                    }}
                                    onChangeText={(text) => { this.setState({ changed: true }) }}
                                />
                                <Text style={{ fontSize: 12, color: commonColors.normalText }}> to </Text>
                                <TextInput
                                    placeholder="Max."
                                    placeholderTextColor={commonColors.placeText}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    underlineColorAndroid="transparent"
                                    style={{
                                        paddingHorizontal: 15,
                                        borderColor: commonColors.placeText, borderWidth: 1,
                                        height: 40, flex: 1,
                                    }}
                                    onChangeText={(text) => { this.setState({ changed: true }) }}
                                />
                            </View>
                        </View>

                        <View style={{ paddingHorizontal: 15, marginTop: 15 }}>
                            <Text style={{ fontSize: 12, color: commonColors.normalText }}>Distance</Text>
                            <TextInput
                                placeholder="Km"
                                placeholderTextColor={commonColors.placeText}
                                autoCapitalize="none"
                                autoCorrect={false}
                                underlineColorAndroid="transparent"
                                style={{
                                    paddingHorizontal: 15,
                                    borderColor: commonColors.placeText, borderWidth: 1,
                                    height: 40, marginTop: 8,
                                }}
                                onChangeText={(text) => { this.setState({ changed: true }) }}
                            />
                        </View>
                        <View style={{ paddingHorizontal: 15, marginTop: 30, alignItems: 'center', flexDirection: 'row' }}>
                            <TouchableOpacity style={{ marginLeft: 0 }} onPress={() => this.setState({ isMale: true, isFemale: false })}>
                                {this.state.isMale == true && <IonIcons name="md-radio-button-on" color={commonColors.theme} size={16} />}
                                {this.state.isMale == false && <IonIcons name="md-radio-button-off" color={commonColors.theme} size={16} />}
                            </TouchableOpacity>
                            <Text style={{ fontSize: 12, color: commonColors.normalText, marginLeft: 10 }}>Male</Text>

                            <TouchableOpacity style={{ marginLeft: 50 }} onPress={() => this.setState({ isFemale: true, isMale: false })}>
                                {this.state.isFemale == true && <IonIcons name="md-radio-button-on" color={commonColors.theme} size={16} />}
                                {this.state.isFemale == false && <IonIcons name="md-radio-button-off" color={commonColors.theme} size={16} />}
                            </TouchableOpacity>
                            <Text style={{ fontSize: 12, color: commonColors.normalText, marginLeft: 10 }}>Female</Text>


                            {/* <Switch
                                onValueChange={(value) => this.setState({ toggled: value })}
                                value={this.state.toggled}
                            /> */}
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    renderInvites(players) {
        return (
            <View>
                <ScrollView
                    horizontal={true}
                    style={{ backgroundColor: commonColors.background, height: 150, marginTop: 15 }}
                >
                    {players.map((item, index) => <TouchableOpacity onPress={() => Actions.PlayerDetail({ ...item })}
                        key={index} activeOpacity={0.7}
                        style={{
                            justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', marginLeft: 15,
                            paddingHorizontal: 10, marginVertical: 20, shadowOpacity: 'black', shadowRadius: 2,
                            shadowOffset: { width: 1, height: 1 }, shadowOpacity: 0.4, width: 100
                        }}>
                        <Image source={item.imageUrl ? { uri: item.imageUrl } : commonStyles.userEmptyIcon} style={{ width: 40, height: 40, borderRadius: 20 }} />
                        <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center', justifyContent: 'center' }}>

                            <StarRatingBar
                                dontShowScore={true}
                                score={Number(item.rating)}
                                spacing={2}
                                readOnly={true}
                                // continuous={true}
                                allowsHalfStars={true}
                                accurateHalfStars={true}
                                starStyle={{
                                    width: 10,
                                    height: 10,
                                }}
                            />
                            <Text style={{ fontSize: 12, marginLeft: 5, width: 20 }}>{item.rating}</Text>
                        </View>
                        <Text style={{ fontSize: 13, color: commonColors.theme, marginTop: 8, overflow: 'hidden' }}>{item.fullName}</Text>
                    </TouchableOpacity>)}
                </ScrollView>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{
                    width: '100%', height: height, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center',
                    paddingTop: Platform.OS === 'ios' ? 20 : 0, borderBottomColor: '#ccc', borderBottomWidth: 0.5,
                }}>
                    <TouchableOpacity style={{ position: 'absolute', left: 15, top: 26 }} onPress={() => Actions.pop()}>
                        <IonIcons name="ios-arrow-round-back" color={'#333'} size={40} style={{ height: 30 }} />
                    </TouchableOpacity>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>{this.props.isEdit ? 'Edit Game' : 'Create New Game'}</Text>
                    </View>
                    {this.state.changed && <TouchableOpacity style={{ position: 'absolute', right: 15, top: 30 }} onPress={() => this.createGame()}>
                        <IonIcons name="ios-checkmark-circle" color={commonColors.theme} size={26} />
                    </TouchableOpacity>}
                </View>
                <ScrollView>

                    <View style={{ backgroundColor: 'white', paddingBottom: 20 }}>
                        {/* <View style={{ paddingHorizontal: 15, marginTop: 30 }}>
                            <Text style={{ fontSize: 12, color: commonColors.normalText }}>Name</Text>
                            <TextInput
                                placeholder="Name"
                                placeholderTextColor={commonColors.placeText}
                                autoCapitalize="none"
                                autoCorrect={false}
                                underlineColorAndroid="transparent"
                                style={{
                                    paddingHorizontal: 15,
                                    borderColor: commonColors.placeText, borderWidth: 1,
                                    height: 40, marginTop: 8,
                                }}
                                onChangeText={(text) => { this.setState({ changed: true }) }}
                            />
                        </View> */}
                        <View style={{ paddingHorizontal: 15, marginTop: 30 }}>
                            <Text style={{ fontSize: 12, color: commonColors.normalText }}>Location</Text>
                            <TextInput
                                placeholder="Location"
                                placeholderTextColor={commonColors.placeText}
                                autoCapitalize="none"
                                autoCorrect={false}
                                underlineColorAndroid="transparent"
                                style={{
                                    paddingHorizontal: 15,
                                    borderColor: commonColors.placeText, borderWidth: 1,
                                    height: 40, marginTop: 8,
                                }}
                                onChangeText={(text) => { this.setState({ location: text }) }}
                            />
                        </View>

                        <View style={{ paddingHorizontal: 15, marginTop: 15 }}>
                            <Text style={{ fontSize: 12, color: commonColors.normalText }}>DAL</Text>
                            <View style={{ marginTop: 8, flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput
                                    placeholder=""
                                    placeholderTextColor={commonColors.placeText}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    underlineColorAndroid="transparent"
                                    style={{
                                        paddingHorizontal: 15,
                                        borderColor: commonColors.placeText, borderWidth: 1,
                                        height: 40, flex: 1,
                                    }}
                                    onChangeText={(text) => { this.setState({ dal: Number(text) }) }}
                                />

                            </View>
                        </View>
                        <View style={{ paddingHorizontal: 15, marginTop: 15 }}>
                            <Text style={{ fontSize: 12, color: commonColors.normalText }}>Date and Time</Text>
                            <DatePicker
                                style={{ width: '100%', borderColor: commonColors.placeText, borderWidth: 1, marginTop: 10 }}
                                date={this.state.scheduledTime}
                                mode="datetime"
                                showIcon={false}
                                placeholder="select date"
                                // format="YYYY-MM-DD hh:mm"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    // dateInput: {
                                    //     marginLeft: 36
                                    // }
                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(dateStr, date) => {
                                    console.log(dateStr, date)
                                    this.setState({ scheduledTime: date })
                                }}
                            />
                            {/* <Text style={{ fontSize: 12, color: commonColors.normalText }}>Date and Time</Text>
                            <TextInput
                                placeholder="Km"
                                placeholderTextColor={commonColors.placeText}
                                autoCapitalize="none"
                                autoCorrect={false}
                                underlineColorAndroid="transparent"
                                style={{
                                    paddingHorizontal: 15,
                                    borderColor: commonColors.placeText, borderWidth: 1,
                                    height: 40, marginTop: 8,
                                }}
                                onChangeText={(text) => { this.setState({ changed: true }) }}
                            /> */}
                        </View>
                        <View style={{ paddingHorizontal: 15, marginTop: 15 }}>
                            <Text style={{ fontSize: 12, color: commonColors.normalText }}>Specific Instruction</Text>
                            <TextInput
                                placeholder="Notes"
                                placeholderTextColor={commonColors.placeText}
                                autoCapitalize="none"
                                autoCorrect={false}
                                underlineColorAndroid="transparent"
                                style={{
                                    paddingHorizontal: 15,
                                    borderColor: commonColors.placeText, borderWidth: 1,
                                    height: 40, marginTop: 8,
                                }}
                                onChangeText={(text) => { this.setState({ info: text }) }}
                            />
                        </View>

                        <View style={{ paddingHorizontal: 15, marginTop: 15 }}>
                            <Text style={{ fontSize: 12, color: commonColors.normalText }}>Wallet</Text>
                            <TextInput
                                placeholder="Wallet"
                                placeholderTextColor={commonColors.placeText}
                                autoCapitalize="none"
                                autoCorrect={false}
                                underlineColorAndroid="transparent"
                                style={{
                                    paddingHorizontal: 15,
                                    borderColor: commonColors.placeText, borderWidth: 1,
                                    height: 40, marginTop: 8,
                                }}
                                onChangeText={(text) => { this.setState({ accountid: text }) }}
                            />
                        </View>
                    </View>

                    <View style={{ backgroundColor: 'white', marginTop: 8 }}>
                        <Text style={{ fontSize: 14, color: 'black', fontWeight: 'bold', paddingHorizontal: 15, marginTop: 15 }}>
                            Invited Players {this.state.invited.length}</Text>
                        {this.renderInvites(this.state.invited)}
                    </View>

                    <View style={{ marginTop: 8, padding: 15, backgroundColor: 'white' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold', flex: 1 }}>Search for Players</Text>
                            <TouchableOpacity style={{}} onPress={() => this.setState({ showOptions: true })}>
                                <IonIcons name="ios-options" color={commonColors.theme} size={20} />
                            </TouchableOpacity>
                        </View>

                        {this.renderPlayers()}
                    </View>
                </ScrollView>
                {this.renderFilteringModal()}
            </View>
        )
    }
}

export default withApollo(AddGame)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: commonColors.background
    }
})