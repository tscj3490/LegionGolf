
import React, { PureComponent } from 'react'

import {
    StyleSheet,
    View,
    Text,
    Platform,
    TouchableOpacity,
    ScrollView,
    Image,
    KeyboardAvoidingView,
    TextInput,
    Modal,
} from 'react-native'


// import { GiftedChat } from 'react-native-gifted-chat'
// import {Ionicons} from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux'
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as commonColors from '../../styles/commonColors'
import * as commonStyles from '../../styles/commonStyles'
// import {BlurView} from 'expo'

const height = 70

export default class PastTransactions extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            name: 'james Lee',
            propertyType: [
                { name: 'Bangalow / Villa' },
                { name: 'Residential Land' },
                { name: 'Apartment / Condo / Service Residence' },
                { name: 'Semi-detached House' },
                { name: 'Terrace / Link House' },
            ],
            type: [
                { name: 'For Sale', selected: true },
                { name: 'For Rent' },
            ],
            transactions: [
                { status: 'Win', date: 'April 5 2018', location: 'Boston', dal: '27' },
                { status: 'Win', date: 'April 5 2018', location: 'Boston', dal: '27' },
                { status: 'Win', date: 'April 5 2018', location: 'Boston', dal: '27' },
                { status: 'Win', date: 'April 5 2018', location: 'Boston', dal: '27' },
                { status: 'Win', date: 'April 5 2018', location: 'Boston', dal: '27' },
                { status: 'Win', date: 'April 5 2018', location: 'Boston', dal: '27' },
                { status: 'Win', date: 'April 5 2018', location: 'Boston', dal: '27' },
                { status: 'Win', date: 'April 5 2018', location: 'Boston', dal: '27' },
                { status: 'Win', date: 'April 5 2018', location: 'Boston', dal: '27' },
            ],
            text: '',
            showSearchOptions: false,
        }
    }

    // componentWillMount(){
    //     this.setState({
    //         messages:[
    //             {_id:1, text:'Hello developer', createdAt: new Date(), user:{_id:2, name:'John', avatar:'https://placeimg.com/140/140/any'}}
    //         ]
    //     })
    // }

    // onSend(messages=[]){
    //     this.setState(prev => ({messages:GiftedChat.append(prev.messages, messages)}))
    // }

    renderHeader() {
        return (
            <View style={{
                width: '100%', height: height, backgroundColor: commonColors.theme, justifyContent: 'center', alignItems: 'center',
                paddingTop: Platform.OS === 'ios' ? 20 : 0
            }}>
                <TouchableOpacity style={{ position: 'absolute', left: 15, top: 30 }} onPress={() => Actions.pop()}>
                    <Ionicons name="ios-arrow-back" color={'white'} size={30} />
                </TouchableOpacity>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Past Transations</Text>
                </View>
                {/* <TouchableOpacity style={{ position: 'absolute', right: 15, top: 35 }} onPress={()=>Actions.pop()}>
                    <Ionicons name="md-checkmark" size={20} color={'white'} />
                </TouchableOpacity> */}
            </View>
        )
    }



    renderBody() {
        return (
            <View style={{}}>
                <View style={{ flexDirection: 'row', backgroundColor: '#ddd', alignItems: 'center', paddingHorizontal: 15, height: 44 }}>
                    <TouchableOpacity style={{ flex: 1, flexDirection: 'row' }}>
                        <Text style={{ fontSize: 12 }} >Status</Text>
                        {/* <Ionicons name="ios-arrow-down" size={18} color={commonColors.theme} style={{marginLeft:5}}/> */}
                    </TouchableOpacity>
                    <Text style={{ flex: 2, marginLeft: 15, fontSize: 12 }}>Date</Text>
                    <Text style={{ flex: 2, marginLeft: 15, fontSize: 12 }}>Location</Text>
                    <Text style={{ flex: 1, marginLeft: 15, fontSize: 12 }}>Dal</Text>
                </View>

                {this.state.transactions.map((item, index) => {
                    return (
                        <TouchableOpacity key={index}
                            onPress={() => {}}
                            style={{ flexDirection: 'row', backgroundColor: index % 2 == 0 ? 'white' : commonColors.background, alignItems: 'center', paddingHorizontal: 15, height: 44 }}>
                            <Text numberOfLines={1} style={{ flex: 1, fontSize: 12 }} >{item.status}</Text>
                            <Text numberOfLines={1} style={{ flex: 2, marginLeft: 15, fontSize: 12 }}>{item.date}</Text>
                            <Text numberOfLines={1} style={{ flex: 2, marginLeft: 15, fontSize: 12 }}>{item.location}</Text>
                            <Text numberOfLines={1} style={{ flex: 1, marginLeft: 15, fontSize: 12 }}>{item.dal}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }

    render() {
        return (
            <View behavior="padding" style={styles.container}>
                {this.renderHeader()}
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