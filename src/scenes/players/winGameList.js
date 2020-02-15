
import React, { PureComponent } from 'react'

import {
    StyleSheet,
    View,
    Text,
    Platform,
    TouchableOpacity,
    ScrollView,
    Image
} from 'react-native'

import { Actions } from 'react-native-router-flux'
import IonIcons from 'react-native-vector-icons/Ionicons'
import * as commonColors from '../../styles/commonColors'
import * as commonStyles from '../../styles/commonStyles'
import {screenHeight, screenWidth} from '../../styles/commonStyles'

const height = (Platform.OS === 'ios') ? 70 : 50

export default class WinGameList extends PureComponent {
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
            winGames: [
                { name: 'jacky chan', email: 'fox0905@oultook.com', players: 4, location: 'Golf Tokyo Japan', time: '12 June, 2018 10:30 AM', price: '3/12' },
                { name: 'jacky chan', email: 'fox0905@oultook.com', players: 4, location: 'Golf Tokyo Japan', time: '12 June, 2018 10:30 AM', price: '3/12' },
                { name: 'jacky chan', email: 'fox0905@oultook.com', players: 4, location: 'Golf Tokyo Japan', time: '12 June, 2018 10:30 AM', price: '3/12' },
                { name: 'jacky chan', email: 'fox0905@oultook.com', players: 4, location: 'Golf Tokyo Japan', time: '12 June, 2018 10:30 AM', price: '3/12' },
            ],
        }
    }

    renderGameList() {
        return (
            <View style={{ flex: 1, width: screenWidth, backgroundColor: 'white' }}>
                <ScrollView style={{ backgroundColor: 'white' }}>
                    {this.state.winGames.length == 0 && <View style={{ width: '100%', height: screenHeight / 2, justifyContent: 'center', alignItems: 'center' }}>
                        <IonIcons name="ios-document-outline" size={80} color={commonColors.textColor1} />
                        <Text style={{ fontSize: 15, color: commonColors.textColor2 }}>No games yet</Text>
                    </View>}


                    {this.state.winGames.length > 0 &&
                        <View style={{ padding: 15 }}>
                            {this.state.winGames.map((item, index) => {
                                return (
                                    <View key={index} activeOpacity={0.7} style={{
                                        backgroundColor: 'white', shadowOpacity: 'black', shadowRadius: 2, width: '100%',
                                        shadowOffset: { width: 1, height: 1 }, shadowOpacity: 0.4, borderRadius: 3, padding: 15, marginTop: 15
                                    }}>
                                        <View style={{ flexDirection: 'row', }}>
                                            <Image source={commonStyles.userEmptyIcon} style={{ height: 40, width: 40, borderRadius: 20 }} />
                                            <View style={{ marginLeft: 10, overflow: 'hidden', flex: 1, justifyContent: 'center' }}>
                                                <Text numberOfLines={1} style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>{item.name}</Text>
                                                {/* <Text numberOfLines={1} style={{ fontSize: 13, color: '#555', marginTop: 8 }}>{item.email}</Text> */}
                                            </View>
                                            <Text style={{ fontSize: 15, color: '#999' }}>{item.players}</Text>
                                        </View>
                                        <View style={{ marginTop: 10 }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <IonIcons name="md-pin" size={20} color={commonColors.theme} style={{ width: 20 }} />
                                                <Text style={{ marginLeft: 8, color: 'grey' }}>{item.location}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                                <IonIcons name="md-alarm" size={20} color={commonColors.theme} style={{ width: 20 }} />
                                                <Text style={{ marginLeft: 8, color: 'grey' }}>{item.time}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                                <Text style={{ color: 'black', fontSize: 14 }}>DAL:</Text>
                                                <Text style={{ marginLeft: 8, color: 'grey' }}>{item.price}</Text>
                                                <View style={{ flex: 1 }} />
                                                <TouchableOpacity onPress={() => Actions.GameDetail({ gameStatus: 0 })}>
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
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Winning Games</Text>
                </View>
                <View style={{ position: 'absolute', right: 15, top: 28 }}>
                    <Image source={commonStyles.userEmptyIcon} style={{ height: 36, width: 36, borderRadius: 18 }} />
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: commonColors.background
    }
})