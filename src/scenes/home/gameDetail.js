
import React, { PureComponent } from 'react'

import {
    StyleSheet,
    View,
    Text,
    Platform,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Modal,
    Image,
    Alert
} from 'react-native'

import { Actions } from 'react-native-router-flux'
import IonIcons from 'react-native-vector-icons/Ionicons'
import MapView, { Marker } from 'react-native-maps'

import * as commonColors from '../../styles/commonColors'
import * as commonStyles from '../../styles/commonStyles'

import StarRatingBar from 'react-native-star-rating-view/StarRatingBar'
import Cache from '../../utils/cache'

import { EditButton, EditableText } from '../../components/editableText'

const height = (Platform.OS === 'ios') ? 70 : 50

export default class GameDetail extends PureComponent {
    constructor(props) {
        super(props)

        console.log(props)

        this.state = {
            name: 'James Lee',
            isShowAll: false,
            isShowAllDesc: false,

            isEditGolfCourse: false,
            isEditNotes: false,
            isEditLocation: false,
            isEditFiltering: false,
            isEditing: false,

            showOptions: false,
            changed: false,


            latlng: { latitude: 37, longitude: -122 },
            descLineNumber: 3,

            contest: '(1st place)',

            golfCourse: 'Brookline, Mass. /Willie Campbell(18950 ',
            notes: 'lets meet by the bar at the club house before the game.',
            location: 'Blk 19, 11 Mount Sophia',
        }
    }
    renderHeader() {
        return (
            <View style={{
                width: '100%', height: height, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center',
                paddingTop: Platform.OS === 'ios' ? 20 : 0, borderBottomColor: '#ccc', borderBottomWidth: 0.5, flexDirection: 'row'
            }}>
                <View style={{ alignItems: 'center', flex: 1 }}>
                    <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>Game Detail</Text>
                </View>
                <TouchableOpacity style={{ position: 'absolute', left: 15, top: 30 }} onPress={() => Actions.pop()}>
                    <IonIcons name="ios-arrow-back" color={'#333'} size={30} />
                </TouchableOpacity>
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
                        {this.state.changed && <TouchableOpacity style={{ position: 'absolute', right: 15, top: 30 }} onPress={() => this.setState({ showOptions: false })}>
                            <IonIcons name="ios-checkmark-circle" color={commonColors.theme} size={26} />
                        </TouchableOpacity>}
                    </View>
                    <View>
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
                    </View>
                </View>
            </Modal>
        )
    }

    renderPlayers(players) {
        return (
            <View>
                <ScrollView
                    horizontal={true}
                    style={{ backgroundColor: commonColors.background, height: 150, marginTop: 15 }}
                >
                    {players.length == 0 && <View style={{ alignItems: 'center', justifyContent: 'center', width: 300 }}>
                        <Text>No Players</Text>
                    </View>}
                    {players.map((item, index) => {
                        let { imageUrl, keybaseid, rating } = item.userByKeybaseid
                        return (
                            <TouchableOpacity onPress={() => Actions.PlayerDetail(item.userByKeybaseid)}
                                key={index} activeOpacity={0.7}
                                style={{
                                    justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', marginLeft: 15,
                                    paddingHorizontal: 10, marginVertical: 20, shadowOpacity: 'black', shadowRadius: 2,
                                    shadowOffset: { width: 1, height: 1 }, shadowOpacity: 0.4, width: 120
                                }}>

                                <Image source={{ uri: imageUrl }} style={{ width: 40, height: 40, borderRadius: 20 }} />

                                <View style={{ width: '100%', flexDirection: 'row', marginTop: 5, alignItems: 'center', justifyContent: 'center' }}>

                                    <StarRatingBar
                                        dontShowScore={true}
                                        score={Number(rating)}
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
                                    <Text style={{ fontSize: 12, marginLeft: 5, width: 20 }}>{rating}</Text>
                                </View>
                                {this.data.endedTime != null && <Text style={{
                                    fontSize: 12, color: '#666', position: 'absolute',
                                    top: 8, right: 8
                                }}>{item.score}</Text>}
                                <Text style={{ fontSize: 13, color: commonColors.theme, marginTop: 3, overflow: 'hidden' }}>{keybaseid}</Text>

                            </TouchableOpacity>)
                    })}
                </ScrollView>
            </View>
        )
    }

    rejectGame() {
        if ( this.data.keybaseid == Cache.currentUser.keybaseid ){
            this.props.close(this.props.id, (res)=> Actions.pop())
        }else{
            this.props.reject(this.props.id, (res) => Actions.pop())
        }
    }

    acceptGame() {
        if ( this.data.keybaseid == Cache.currentUser.keybaseid ){
            this.props.start(this.props.id, (res) => Actions.pop())
        }else{
            this.props.accept(this.props.id, (res) => Actions.pop())
        }
        
    }

    render() {
        if (this.props.invitesByGameId) {
            let { location, dal, locationLat, locationLon, info, scheduledTime, startedTime, endedTime, invitesByGameId, keybaseid } = this.props
            let { totalCount, nodes } = invitesByGameId

            this.data = { info, location, startedTime, keybaseid, endedTime, scheduledTime, dal, totalCount, nodes, }
        }
        else {
            let { responded, gameByGameId } = this.props
            let { info, userByKeybaseid, invitesByGameId, location, startedTime, endedTime, keybaseid, scheduledTime, dal } = gameByGameId
            let { imageUrl } = userByKeybaseid
            let { totalCount, nodes } = invitesByGameId

            this.data = { responded, info, location, startedTime, keybaseid, endedTime, scheduledTime, dal, imageUrl, totalCount, nodes }
        }
        let { responded, info, location, startedTime, keybaseid, endedTime, scheduledTime, dal, imageUrl, totalCount, nodes } = this.data
        let properties = [], accepted = []
        nodes.map((item) => {
            if (item.accepted) accepted.push(item)
        })

        properties.push({ title: 'Organizer', value: keybaseid })
        properties.push({ title: 'DAL', value: dal + '/' + accepted.length * dal })
        properties.push({ title: 'Date and Time', value: scheduledTime })
        if (startedTime != null)
            properties.push({ title: 'Started At', value: startedTime })
        if (endedTime != null)
            properties.push({ title: 'Finished At', value: endedTime })
        properties.push({ title: 'Result', value: '' })


        return (
            <View style={styles.container}>
                {/* <Header type="back" back={() => Actions.pop()} /> */}
                {this.renderHeader()}
                <ScrollView>
                    {/* <Slideshow
                        dataSource={this.state.images}
                        height={180} /> */}
                    <View style={{ paddingVertical: 15, width: '100%', backgroundColor: 'white' }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', borderColor: '#666', borderWidth: 1, marginHorizontal: 5, marginTop: 8, paddingTop: 15 }}>

                            <View style={{ borderBottomColor: '#666', borderBottomWidth: 1, paddingHorizontal: 10, width: '100%' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                                    <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>{location}</Text>
                                    {/* <EditableText
                                        isEditing={this.state.isEditGolfCourse}
                                        placeholder="input golf course..."
                                        value={this.state.golfCourse}
                                        onChangeText={golfCourse => this.setState({ golfCourse })}
                                        textStyle={{ color: '#000', fontWeight: 'bold' }}
                                    />
                                    {this.props.gameStatus == 3 && <EditButton
                                        disabled={this.state.isEditing && !this.state.isEditGolfCourse}
                                        isEditing={this.state.isEditGolfCourse}
                                        onPress={() => this.setState({ isEditGolfCourse: !this.state.isEditGolfCourse, isEditing: !this.state.isEditing })}
                                    />} */}
                                </View>
                            </View>
                            <View style={{ width: '100%', paddingLeft: 10, marginBottom: 10 }}>
                                {properties.map((item, index) => {
                                    // if (!this.state.isShowAll && index >= 2) return null

                                    return (
                                        <View key={index} style={{ flexDirection: 'row', marginTop: 10 }}>
                                            <View style={{ flex: 0.4 }}>
                                                <Text style={{ color: '#333', fontSize: 14, flex: 1 }}>{item.title}</Text>
                                            </View>
                                            <View style={{ flex: 0.6, borderBottomColor: '#666', borderBottomWidth: 1 }}>
                                                {item.title!='Result' && <Text style={{ color: '#666', fontSize: 14, flex: 2 }}>{item.value}</Text>}
                                                {item.title=='Result' && endedTime != null &&
                                                    <TouchableOpacity onPress={() => Actions.Score({ disabled: true })}>
                                                        <Text style={{ color: commonColors.theme, fontSize: 14, fontWeight: 'bold' }}>{item.value + this.state.contest}</Text>
                                                    </TouchableOpacity>}
                                            </View>
                                        </View>
                                    )
                                })}

                            </View>
                        </View>
                    </View>
                    <View style={{ backgroundColor: 'white', width: '100%', padding: 15, marginTop: 8 }}>

                        <Text style={{ fontSize: 14, color: 'black', fontWeight: 'bold', flex: 1 }}>
                            Specific Instruction
                        </Text>
                        {/* {this.props.gameStatus == 3 && <EditButton
                                disabled={this.state.isEditing && !this.state.isEditNotes}
                                isEditing={this.state.isEditNotes}
                                onPress={() => this.setState({ isEditNotes: !this.state.isEditNotes, isEditing: !this.state.isEditing })}
                            />} */}

                        <Text style={{ color: '#333', fontSize: 14, marginTop: 10 }}>{info}</Text>
                        {/* <EditableText
                            isEditing={this.state.isEditNotes}
                            placeholder="input notes..."
                            value={this.state.notes}
                            onChangeText={notes => this.setState({ notes })}
                            inputStyle={{ color: '#333' }}
                        /> */}
                    </View>
                    <MapView
                        initialRegion={{
                            latitude: 37,
                            longitude: -122,
                            latitudeDelta: 0.1,
                            longitudeDelta: 0.04
                        }}
                        style={{ width: '100%', height: 200, marginTop: 8 }}
                    >
                        <Marker coordinate={this.state.latlng}>
                            <TouchableOpacity>
                                <IonIcons name="md-home" color={'rgb(200,0,29)'} size={20} />
                            </TouchableOpacity>
                        </Marker>
                    </MapView>
                    <View style={{ backgroundColor: 'white', width: '100%', padding: 15, marginTop: 8 }}>
                        <Text style={{ fontSize: 14, color: 'black', fontWeight: 'bold', flex: 1 }}>
                            Location
                        </Text>
                        {/* {this.props.gameStatus == 3 && <EditButton
                                disabled={this.state.isEditing && !this.state.isEditLocation}
                                isEditing={this.state.isEditLocation}
                                onPress={() => this.setState({ isEditLocation: !this.state.isEditLocation, isEditing: !this.state.isEditing })}
                            />} */}

                        <Text style={{ color: '#333', fontSize: 14, marginTop: 10 }}>{location}</Text>
                        {/* <EditableText
                            isEditing={this.state.isEditLocation}
                            placeholder="input location..."
                            value={this.state.location}
                            onChangeText={location => this.setState({ location })}
                            inputStyle={{ color: '#333' }}
                        /> */}
                    </View>

                    <View style={{ backgroundColor: 'white', width: '100%', paddingVertical: 15, marginTop: 8 }}>
                        <View style={{ flexDirection: 'row', width: '100%' }}>
                            <Text style={{ fontSize: 14, color: 'black', fontWeight: 'bold', paddingHorizontal: 15, flex: 1 }}>Joined Players {accepted.length}</Text>
                            {keybaseid == Cache.currentUser.keybaseid && <TouchableOpacity style={{ marginRight: 15 }} onPress={() => Actions.InviteMembers({ isEdit: true })}>
                                <IonIcons name="md-create" color={commonColors.theme} size={24} />
                            </TouchableOpacity>}
                        </View>
                        {this.renderPlayers(accepted)}
                        {startedTime == null && <View style={{ paddingHorizontal: 15, marginTop: 15 }}>
                            <Text style={{ fontSize: 14, color: 'black', fontWeight: 'bold', flex: 1 }}>
                                Invited Players {nodes.length}
                            </Text>

                            {/* {this.state.isEditFiltering && <TouchableOpacity onPress={() => this.filtering()} activeOpacity={0.7}
                                style={{
                                    justifyContent: 'center', alignItems: 'center'
                                }}>
                                <IonIcons name="ios-options" size={24} color={commonColors.theme} style={{ marginRight: 10 }} />
                            </TouchableOpacity>}

                            {this.props.gameStatus == 3 && <EditButton
                                disabled={this.state.isEditing && !this.state.isEditFiltering}
                                isEditing={this.state.isEditFiltering}
                                onPress={() => this.setState({ isEditFiltering: !this.state.isEditFiltering, isEditing: !this.state.isEditing })}
                            />} */}
                        </View>}
                        {startedTime == null && this.renderPlayers(nodes)}

                        {this.renderFilteringModal()}
                    </View>

                    {startedTime == null && <View style={{ height: 60 }} />}
                </ScrollView>
                {startedTime == null && <View style={{
                    position: 'absolute', bottom: 0, width: '100%', backgroundColor: 'white',
                    borderTopColor: '#ccc', borderTopWidth: 0.5
                }}>
                    <View style={{ flexDirection: 'row', paddingHorizontal: 15, justifyContent: 'center', alignItems: 'center', height: 50, width: '100%' }}>
                        <Image source={{ uri: imageUrl }} style={{ width: 40, height: 40, borderRadius: 20 }} />
                        <Text style={{ fontSize: 14, color: 'grey', flex: 1, marginLeft: 15 }}>
                            {responded ? 'Group Chat' : 'Chat With Organizer'}</Text>
                        <TouchableOpacity onPress={() => Actions.ChatView()}>
                            <IonIcons name="ios-chatbubbles" color={commonColors.theme} size={20} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 40, width: '100%', flexDirection: 'row', borderTopColor: '#ccc', borderTopWidth: 0.5, backgroundColor: '#e2ece2' }}>
                        {!responded && <TouchableOpacity onPress={() => this.acceptGame()} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: commonColors.theme, fontSize: 13 }}>{keybaseid != Cache.currentUser.keybaseid?'Accept':'Start'}</Text>
                            </TouchableOpacity>}
                        <View style={{ height: '100%', width: 1, backgroundColor: '#ccc' }} />
                        <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={() => this.rejectGame()}>
                            <Text style={{ color: '#333', fontSize: 13 }}>{keybaseid == Cache.currentUser.keybaseid ? 'Close' : 'Decline'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: commonColors.background
    }
})