
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
} from 'react-native'

import { Actions } from 'react-native-router-flux'
import { GiftedChat } from 'react-native-gifted-chat'
import IonIcons from 'react-native-vector-icons/Ionicons'
import * as commonColors from '../../styles/commonColors'
import * as commonStyles from '../../styles/commonStyles'
import NavTitle from '../../components/navTitle'

const height = (Platform.OS === 'ios') ? 80 : 60

export default class ChatView extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            name: 'james Lee',
            messages: [],
            text: '',
        }
    }

    componentWillMount(){
        this.setState({
            messages:[
                {_id:1, text:'Hello developer', createdAt: new Date(), user:{_id:2, name:'John', avatar:'https://placeimg.com/140/140/any'}}
            ]
        })
    }

    onSend(messages=[]){
        this.setState(prev => ({messages:GiftedChat.append(prev.messages, messages)}))
    }

    renderHeader() {
        return (
            <View style={{
                width: '100%', height: height, backgroundColor: commonColors.theme, justifyContent: 'center', alignItems: 'center',
                paddingTop: Platform.OS === 'ios' ? 20 : 0
            }}>
                <TouchableOpacity style={{ position: 'absolute', left: 15, top: 30 }} onPress={() => Actions.pop()}>
                    <IonIcons name="ios-arrow-back" color={'white'} size={30} />
                </TouchableOpacity>
                <View style={{ alignItems: 'center' }}>
                    <Image source={{uri:'https://placeimg.com/140/140/any'}} style={{ height: 34, width: 34, borderRadius: 17 }} />
                    <Text style={{ color: 'white', fontSize: 13, fontWeight: 'bold' }}>{this.state.name}</Text>
                </View>
                <TouchableOpacity style={{ position: 'absolute', right: 15, top: 30 }} onPress={()=>Actions.PlayerDetail({fromChat:true})}>
                    <IonIcons name="ios-information-circle-outline" color={'white'} size={30} />
                </TouchableOpacity>
            </View>
        )
    }

    renderChatItem(item, index) {
        return (
            <View key={index} >

            </View>
        )
    }

    render() {
        return (
            <View behavior="padding" style={styles.container}>
                {this.renderHeader()}
                <GiftedChat
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                />
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