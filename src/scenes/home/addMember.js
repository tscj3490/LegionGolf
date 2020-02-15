'use strict';

import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Platform,
    StatusBar,
    Alert,
    Modal,
    TextInput,
} from 'react-native';

import { Actions, ActionConst, Scene, Router } from 'react-native-router-flux';
import IonIcons from 'react-native-vector-icons/Ionicons'

import * as commonColors from '../../styles/commonColors'
import * as commonStyles from '../../styles/commonStyles'
import { screenHeight, screenWidth } from '../../styles/commonStyles';
const height = (Platform.OS === 'ios') ? 70 : 50

export default class AddMember extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            players: [
                { name: 'jacky chan', email: 'fox0905@oultook.com', players: 4, handicap: 11, location: 'Golf Tokyo Japan', time: '12 June, 2018 10:30 AM', price: 3 },
                { name: 'jacky chan', email: 'fox0905@oultook.com', players: 4, handicap: 18, location: 'Golf Tokyo Japan', time: '12 June, 2018 10:30 AM', price: 3 },
                { name: 'jacky chan', email: 'fox0905@oultook.com', players: 4, handicap: 43, location: 'Golf Tokyo Japan', time: '12 June, 2018 10:30 AM', price: 3 },
                { name: 'jacky chan', email: 'fox0905@oultook.com', players: 4, handicap: 3, location: 'Golf Tokyo Japan', time: '12 June, 2018 10:30 AM', price: 3 },
            ],
            showOptions: false,
            changed: false,
            countOfPlayers: 0,
        }
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

    renderPlayer() {
        if (this.state.players.length == 0) return null
        return (
            <View style={{ padding: 15 }}>
                {this.state.players.map((item, index) => {
                    return (
                        <View key={index} activeOpacity={0.7} style={{
                            backgroundColor: 'white', shadowOpacity: 'black', shadowRadius: 2, width: '100%',
                            shadowOffset: { width: 1, height: 1 }, shadowOpacity: 0.4, borderRadius: 3, padding: 15, marginTop: 15
                        }}>
                            <View style={{ flexDirection: 'row', }}>
                                <Image source={commonStyles.userEmptyIcon} style={{ height: 40, width: 40, borderRadius: 20 }} />
                                <View style={{ marginLeft: 10, overflow: 'hidden', flex: 1 }}>
                                    <Text numberOfLines={1} style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>{item.name}</Text>
                                    <Text numberOfLines={1} style={{ fontSize: 13, color: '#555', marginTop: 8 }}>{item.email}</Text>
                                </View>
                                <TouchableOpacity onPress={() => {
                                    if ( this.state.players[index].checked != true ){
                                        this.state.countOfPlayers ++
                                    }else{
                                        this.state.countOfPlayers --
                                    }
                                    this.state.players[index].checked = !this.state.players[index].checked
                                    this.setState({ players: [...this.state.players], countOfPlayers:this.state.countOfPlayers })
                                }}>
                                    {!item.checked && <IonIcons name="md-square-outline" color={commonColors.theme} size={20} />}
                                    {item.checked && <IonIcons name="md-checkbox" color={commonColors.theme} size={20} />}
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                <Text style={{ fontSize: 14, color: '#333' }}>Handicap : </Text>
                                <Text style={{ fontSize: 14, color: '#999' }}>{item.handicap} </Text>
                                <View style={{ flex: 1 }} />
                                <TouchableOpacity onPress={() => Actions.PlayerDetail()}>
                                    <Text style={{ color: commonColors.theme, fontSize: 15 }}>View Detail</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                })}
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={{
                    width: '100%', height: height, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center',
                    borderBottomColor: '#ccc', borderBottomWidth: 0.5,
                }}>
                    <TouchableOpacity style={{ position: 'absolute', left: 15, top: 16 }} onPress={() => Actions.pop()}>
                        <IonIcons name="ios-arrow-round-back" color={'#333'} size={40} style={{ height: 30 }} />
                    </TouchableOpacity>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>Add Members</Text>
                    </View>
                    <TouchableOpacity style={{ position: 'absolute', right: 15, top: 20 }} onPress={() => this.setState({ showOptions: true })}>
                        <IonIcons name="ios-options" color={commonColors.theme} size={26} />
                    </TouchableOpacity>
                </View>
                <ScrollView style={{ flex: 1 }}>
                    {this.renderPlayer()}
                    <View style={{ height: 50 }} />
                </ScrollView>
                <TouchableOpacity disabled={this.state.countOfPlayers==0} activeOpacity={0.7} onPress={()=>Actions.pop()} style={{
                    backgroundColor: this.state.countOfPlayers==0?'grey':commonColors.theme, width: '100%',
                    height: 44, justifyContent: 'center', alignItems: 'center', position: 'absolute', left: 0, bottom: 0
                }}>
                    <Text style={{ color: 'white', fontSize: 13, fontWeight: 'bold' }}>ADD</Text>
                </TouchableOpacity>
                {this.renderFilteringModal()}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
    },
})
