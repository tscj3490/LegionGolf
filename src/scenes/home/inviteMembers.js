
import React, { PureComponent } from 'react'

import {
    StyleSheet,
    View,
    Text,
    Platform,
    TouchableOpacity,
    ScrollView,
    Image,
    TextInput,
    Modal,
} from 'react-native'

import { Actions } from 'react-native-router-flux'
import IonIcons from 'react-native-vector-icons/Ionicons'
import MapView, { Marker } from 'react-native-maps'

import StarRatingBar from 'react-native-star-rating-view/StarRatingBar'

import * as commonColors from '../../styles/commonColors'
import * as commonStyles from '../../styles/commonStyles'

const height = (Platform.OS === 'ios') ? 70 : 50

 
export default class InviteMembers extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            players: [
                { name: 'jacky chan', email: 'fox0905@oultook.com', players: 4, handicap: 11, location: 'Golf Tokyo Japan', time: '12 June, 2018 10:30 AM', price: 3, rating: 3.5 },
                { name: 'jacky chan', email: 'fox0905@oultook.com', players: 4, handicap: 18, location: 'Golf Tokyo Japan', time: '12 June, 2018 10:30 AM', price: 3, rating: 3.5 },
                { name: 'jacky chan', email: 'fox0905@oultook.com', players: 4, handicap: 43, location: 'Golf Tokyo Japan', time: '12 June, 2018 10:30 AM', price: 3, rating: 3.5 },
                { name: 'jacky chan', email: 'fox0905@oultook.com', players: 4, handicap: 3, location: 'Golf Tokyo Japan', time: '12 June, 2018 10:30 AM', price: 3, rating: 3.5 },
            ],
            invited: [
                { name: 'Alex', email: 'Alex@outlook.com', rating: 4.5 },
                { name: 'Alex', email: 'Alex@outlook.com', rating: 2.5 },
                { name: 'Alex', email: 'Alex@outlook.com', rating: 3.5 },
            ],
            changed: true,
            showOptions: false,
        }
    }

    removePlayer() {

    }

    renderPlayers() {
        return (
            <View>
                {this.state.players.map((item, index) => {
                    return (
                        <View key={index} activeOpacity={0.7} style={{
                            backgroundColor: 'white', shadowOpacity: 'black', shadowRadius: 2, width: '100%',
                            shadowOffset: { width: 1, height: 1 }, shadowOpacity: 0.4, borderRadius: 3, padding: 15, marginTop: 15
                        }}>
                            <View style={{ flexDirection: 'row', }}>
                                <Image source={commonStyles.userEmptyIcon} style={{ height: 40, width: 40, borderRadius: 20 }} />
                                <View style={{ marginLeft: 10, overflow: 'hidden', flex: 1, justifyContent: 'center' }}>
                                    <Text numberOfLines={1} style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>{item.name}</Text>
                                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>

                                        <StarRatingBar
                                            dontShowScore={true}
                                            score={item.rating}
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
                                        <Text style={{ fontSize: 12, marginLeft: 5, width: 20 }}>{item.rating.toFixed(1)}</Text>
                                    </View>
                                    {/* <View style={{flexDirection:'row', marginTop: 8, alignItems:'center'}}>
                                        <IonIcons name="md-male" size={16} color={'black'}/>
                                        <Text numberOfLines={1} style={{ fontSize: 13, color: '#555', marginLeft:8 }}>MAN</Text>
                                    </View> */}
                                </View>
                                <TouchableOpacity onPress={() => this.removePlayer(index)}>
                                    <Text style={{ fontSize: 14, color: commonColors.theme }}>Invite</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                <Text style={{ fontSize: 14, color: '#333' }}>Handicap : </Text>
                                <Text style={{ fontSize: 14, color: '#999' }}>{item.handicap} </Text>
                                <Text style={{ fontSize: 14, color: 'black', marginLeft: 10 }}>M </Text>
                                <View style={{ flex: 1 }} />
                                <TouchableOpacity onPress={() => Actions.PlayerDetail()}>
                                    <Text style={{ color: commonColors.theme, fontSize: 14 }}>View Detail</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                })}
            </View>
        )
    }

    filtering() {
        console.log('-----------')
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
                        
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>Filtering Options</Text>
                        </View>
                        <TouchableOpacity style={{ position: 'absolute', left: 15, top: 26 }} onPress={() => this.setState({ showOptions: false })}> 
                            <IonIcons name="ios-arrow-round-back" color={'#333'} size={40} style={{ height: 30 }} />
                        </TouchableOpacity>
                        {this.state.changed && <TouchableOpacity style={{ position: 'absolute', right: 15, top: 30 }} onPress={() => this.setState({ showOptions: false })}>
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

    renderInvites(players) {
        return (
            <View>
                <ScrollView
                    horizontal={true}
                    style={{ backgroundColor: commonColors.background, height: 150, marginTop: 15 }}
                >
                    {players.map((item, index) => <TouchableOpacity onPress={() => Actions.PlayerDetail()}
                        key={index} activeOpacity={0.7}
                        style={{
                            justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', marginLeft: 15,
                            paddingHorizontal: 10, marginVertical: 20, shadowOpacity: 'black', shadowRadius: 2,
                            shadowOffset: { width: 1, height: 1 }, shadowOpacity: 0.4, width: 100
                        }}>
                        <Image source={commonStyles.userEmptyIcon} style={{ width: 40, height: 40, borderRadius: 20 }} />
                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 5, alignItems: 'center', justifyContent: 'center' }}>

                            <StarRatingBar
                                dontShowScore={true}
                                score={item.rating}
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
                            <Text style={{ fontSize: 12, marginLeft: 5, width: 20 }}>{item.rating.toFixed(1)}</Text>
                        </View>
                        <Text style={{
                            fontSize: 12, color: '#666', position: 'absolute',
                            top: 8, right: 8
                        }}>{item.score}</Text>
                        <Text style={{ fontSize: 13, color: commonColors.theme, marginTop: 8, overflow: 'hidden' }}>{item.name}</Text>
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
                        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>Invite Members</Text>
                    </View>
                    {/* {this.state.changed && <TouchableOpacity style={{ position: 'absolute', right: 15, top: 30 }} onPress={() => Actions.pop()}>
                        <IonIcons name="ios-checkmark-circle" color={commonColors.theme} size={26} />
                    </TouchableOpacity>} */}
                </View>
                <ScrollView>

                    <View style={{ backgroundColor: 'white', marginTop: 8 }}>
                        <Text style={{ fontSize: 14, color: 'black', fontWeight: 'bold', paddingHorizontal: 15, marginTop: 15 }}>
                            Invited Members {this.state.invited.length}</Text>
                        {this.renderInvites(this.state.invited)}
                    </View>

                    <View style={{ marginTop: 8, padding: 15, backgroundColor: 'white' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold', flex: 1 }}>Filtered Members</Text>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: commonColors.background
    }
})