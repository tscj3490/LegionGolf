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
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import IonIcons from 'react-native-vector-icons/Ionicons'

import * as commonColors from '../../styles/commonColors'
import * as commonStyles from '../../styles/commonStyles'
import { screenHeight, screenWidth } from '../../styles/commonStyles';

export default class History extends PureComponent {
    constructor(props) {
        super(props);
        this.state={
            chatList:[
                {name:'Jacky Chan', text:'Hi, Jacky! How are you?', time:'11:41 PM', count:2},
                {name:'John Won', text:'Hi, John! Yes, I can', time:'10:25 PM', count:1},
                {name:'Master-S', text:'Hi, s! How are you?', time:'YESTERDAY', count:0},
                {name:'Alex', text:'Hi, Alex! How are you?', time:'04/03/2018', count:0},
            ]
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{flexDirection:'row', height:50, width:'100%', alignItems:'center', justifyContent:'center', borderBottomColor:'#ccc', borderBottomWidth:0.5}}>
                    <Text style={{color:commonColors.theme, fontSize:28, fontWeight:'bold'}}>Lea</Text>
                    <Image source={commonStyles.logo} style={{width:70, height:44}} />
                    <Text style={{color:commonColors.theme, fontSize:28, fontWeight:'bold'}}>gion</Text>
                </View>
                <ScrollView style={{flex:1, backgroundColor:commonColors.background}}>
                    {this.state.chatList.map((item, index)=><TouchableOpacity key={index} onPress={()=>Actions.ChatView()}
                        activeOpacity={0.7} style={{backgroundColor:'white', paddingHorizontal:15, paddingVertical:7, flexDirection:'row', marginTop:8}}>
                        <Image source={commonStyles.userEmptyIcon} style={{height:50, width:50, borderRadius:25}}/>
                        <View style={{marginLeft:10, overflow:'hidden', flex:1}}>
                            <Text numberOfLines={1} style={{fontSize:15, color:'black', fontWeight:'bold'}}>{item.name}</Text>
                            <Text numberOfLines={1} style={{fontSize:13, color:'#555', marginTop:8}}>{item.text}</Text>
                        </View>
                        <View style={{marginLeft:10, alignItems:'flex-end'}}>
                            <Text style={{color:'#aaa', fontSize:15}}>{item.time}</Text>
                            {item.count>0&&<View style={{height:20, width:20, justifyContent:'center', alignItems:'center', backgroundColor:'rgb(181,18,29)', borderRadius:10, marginTop:5}}>
                                <Text style={{fontSize:12, color:'white', fontWeight:'bold'}}>{item.count}</Text>
                            </View>}
                        </View>
                    </TouchableOpacity>)}
                </ScrollView>
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
