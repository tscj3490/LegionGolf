
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
import StarRatingBar from 'react-native-star-rating-view/StarRatingBar'

import IonIcons from 'react-native-vector-icons/Ionicons'
import * as commonColors from '../../styles/commonColors'
import * as commonStyles from '../../styles/commonStyles'

const height = (Platform.OS === 'ios') ? 70 : 50

export default class PlayerDetail extends PureComponent {
    constructor(props) {
        super(props)        
        
        this.state = {
            // countOfRents: 4,
            // countOfTrans: 12,
            // countOfSales: 25,
            // name: 'Jacky Chan',
            // rating: 4.5,
            // email: 'itfox0905@gmail.com',
            // keybaseId: 'jacky0905',
            // header: 'Welcome to my profile!',

            // location: 'China, Liaoning Shenyang',
            // gender: 'Male',
            // age: '36',
            // stake: 3,
            // handicap: 30
        }
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
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Player Detail</Text>
                </View>
                {!this.props.fromChat && <TouchableOpacity style={{ position: 'absolute', right: 15, top: 33 }} onPress={() => Actions.ChatView()}>
                    <IonIcons name="ios-chatbubbles" color={'white'} size={24} />
                </TouchableOpacity>}
            </View>
        )
    }

    renderHeader() {
        return (
            <View style={{ padding: 15, borderBottomColor: 'grey', borderBottomWidth: 1, flexDirection: 'row' }} >
                <Image source={{ uri: this.props.imageUrl }} style={{ height: 60, width: 60, borderRadius: 30 }} />
                <View style={{ marginLeft: 20, flex: 1, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 15, color: '#333', fontWeight: 'bold' }}>{this.props.keybaseid}</Text>
                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>

                        <StarRatingBar
                            dontShowScore={true}
                            score={Number(this.props.rating)}
                            spacing={5}
                            readOnly={true}
                            // continuous={true}
                            allowsHalfStars={true}
                            accurateHalfStars={true}
                            starStyle={{
                                width: 14,
                                height: 14,
                            }}
                        />
                        <Text style={{ fontSize: 12, marginLeft: 5, width: 20 }}>{Number(this.props.rating).toFixed(1)}</Text>
                    </View>
                    {/* <Text style={{ fontSize: 14, color: '#333', marginTop: 5 }}>{this.state.keybaseId}</Text>
                    <Text style={{ fontSize: 14, color: '#333', marginTop: 5 }}>{this.state.email}</Text> */}
                </View>
            </View>
        )
    }



    renderAboutMe() {
        return (
            <View style={{ backgroundColor: 'white', padding: 15 }}>
                {/* <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                    <Text style={{ fontSize: 14, color: 'black', fontWeight: 'bold' }}>About Me</Text>
                </View> */}
                <View style={{ marginTop: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: 'black', fontSize: 14, flex: 1 }}>fullName </Text>
                        <Text style={{ marginLeft: 8, color: 'grey', flex: 2.5 }}>{this.props.fullName}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 8 }}>
                        <Text style={{ color: 'black', fontSize: 14, flex: 1 }}>Handicap </Text>
                        <Text style={{ marginLeft: 8, color: 'grey', flex: 2.5 }}>{this.props.handicap}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 8 }}>
                        <Text style={{ color: 'black', fontSize: 14, flex: 1 }}>Location </Text>
                        <Text style={{ marginLeft: 8, color: 'grey', flex: 2.5 }}>{this.props.location}</Text>
                    </View>
                    {/* <View style={{ flexDirection: 'row', marginTop: 8 }}>
                        <Text style={{ color: 'black', fontSize: 14, flex: 1 }}>Stake </Text>
                        <Text style={{ marginLeft: 8, color: 'grey', flex: 2.5 }}>{this.state.stake}</Text>
                    </View> */}
                    <View style={{ flexDirection: 'row', marginTop: 8 }}>
                        <Text style={{ color: 'black', fontSize: 14, flex: 1 }}>Gender </Text>
                        <Text style={{ marginLeft: 8, color: 'grey', flex: 2.5 }}>{this.props.gender}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 8 }}>
                        <Text style={{ color: 'black', fontSize: 14, flex: 1 }}>Age </Text>
                        <Text style={{ marginLeft: 8, color: 'grey', flex: 2.5 }}>{this.props.age}</Text>
                    </View>

                </View>
            </View>

        )
    }

    renderBody() {
        return (
            <View>
                {/* <TouchableOpacity style={{
                    marginTop: 8, flexDirection: 'row', alignItems: 'center',
                    paddingHorizontal: 15, backgroundColor: 'white', height: 44
                }}>
                    <IonIcons name="md-ribbon" size={20} color={commonColors.theme} />
                    <Text style={{ fontSize: 14, color: 'black', fontWeight: 'bold', marginLeft: 10 }}>Upcomming Games</Text>
                    <View style={{ flex: 1 }} />
                    <Text style={{ fontSize: 12, color: 'black', marginRight: 15 }}>{this.state.countOfTrans}</Text>
                    <IonIcons name="ios-arrow-forward" color={commonColors.theme} size={20} />
                </TouchableOpacity> */}
                {/* <TouchableOpacity onPress={()=>Actions.WinGameList()} style={{
                    marginTop: 8, flexDirection: 'row', alignItems: 'center',
                    paddingHorizontal: 15, backgroundColor: 'white', height: 44
                }}>
                    <IonIcons name="md-medal" size={20} color={commonColors.theme} />
                    <Text style={{ fontSize: 14, color: 'black', fontWeight: 'bold', marginLeft: 10 }}>Winning Games</Text>
                    <View style={{ flex: 1 }} />
                    <Text style={{ fontSize: 12, color: 'black', marginRight: 15 }}>{this.state.countOfSales}</Text>
                    <IonIcons name="ios-arrow-forward" color={commonColors.theme} size={20} />
                </TouchableOpacity> */}
                {/* <TouchableOpacity style={{
                    marginTop: 8, flexDirection: 'row', alignItems: 'center',
                    paddingHorizontal: 15, backgroundColor: 'white', height: 44
                }}>
                    <IonIcons name="md-sad" size={20} color={commonColors.theme} />
                    <Text style={{ fontSize: 14, color: 'black', fontWeight: 'bold', marginLeft: 10 }}>Lost Games</Text>
                    <View style={{ flex: 1 }} />
                    <Text style={{ fontSize: 12, color: 'black', marginRight: 15 }}>{this.state.countOfRents}</Text>
                    <IonIcons name="ios-arrow-forward" color={commonColors.theme} size={20} />
                </TouchableOpacity> */}
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderNavTitle()}
                {this.renderHeader()}
                {this.renderAboutMe()}
                {this.renderBody()}
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