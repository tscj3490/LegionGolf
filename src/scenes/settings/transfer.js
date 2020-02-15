
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

import * as commonColors from '../../styles/commonColors'
import * as commonStyles from '../../styles/commonStyles'

const height = (Platform.OS === 'ios') ? 70 : 50

export default class Transfer extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            players: [
                { name: 'jacky chan', email: 'fox0905@oultook.com', players: 4, handicap: 11, location: 'Golf Tokyo Japan', time: '12 June, 2018 10:30 AM', price: 3 },
                { name: 'jacky chan', email: 'fox0905@oultook.com', players: 4, handicap: 18, location: 'Golf Tokyo Japan', time: '12 June, 2018 10:30 AM', price: 3 },
                { name: 'jacky chan', email: 'fox0905@oultook.com', players: 4, handicap: 43, location: 'Golf Tokyo Japan', time: '12 June, 2018 10:30 AM', price: 3 },
                { name: 'jacky chan', email: 'fox0905@oultook.com', players: 4, handicap: 3, location: 'Golf Tokyo Japan', time: '12 June, 2018 10:30 AM', price: 3 },
            ],
            invited: [
                { name: 'Alex', email: 'Alex@outlook.com' },
                { name: 'Alex', email: 'Alex@outlook.com' },
                { name: 'Alex', email: 'Alex@outlook.com' },
            ],
            changed: true,
            showOptions: false,
        }
    }

    transfer() {

    }


    render() {
        return (
            <View style={styles.container}>
                <View style={{
                    width: '100%', height: height, backgroundColor: commonColors.theme, justifyContent: 'center', alignItems: 'center',
                    paddingTop: Platform.OS === 'ios' ? 20 : 0
                }}>
                    <TouchableOpacity style={{ position: 'absolute', left: 15, top: 30 }} onPress={() => Actions.pop()}>
                        <IonIcons name="ios-arrow-back" color={'white'} size={30} />
                    </TouchableOpacity>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Transfer</Text>
                    </View>
                </View>


                <View style={{ backgroundColor: 'white', paddingBottom: 20, flex:1 }}>
                    <View style={{ paddingHorizontal: 15, marginTop: 30 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 12, color: commonColors.normalText, flex: 1 }}>To</Text>
                            <TouchableOpacity style={{
                                position: 'absolute', right: 0, bottom: 0,
                                height: 24, width: 24, justifyContent: 'center', alignItems: 'center'
                            }}>
                                <IonIcons name="ios-camera-outline" size={24} color={'black'} />
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            placeholder="Wallet address"
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
                        <Text style={{ fontSize: 12, color: commonColors.normalText }}>Amount</Text>
                        <TextInput
                            placeholder="Amount"
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

                    <TouchableOpacity
                        style={styles.transfer}
                        onPress={() => this.transfer()}>
                        <Text style={styles.transferText}>Transfer</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: commonColors.background
    },
    transfer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 48,
        backgroundColor: commonColors.theme,
        borderRadius: 3,
        marginHorizontal: 15,
        marginTop: 30
    },
    transferText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        //fontFamily: 'openSans',
    },
})