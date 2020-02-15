
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
    Alert,
    Clipboard
} from 'react-native'

import { Actions } from 'react-native-router-flux'
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as commonColors from '../../styles/commonColors'
import * as commonStyles from '../../styles/commonStyles'



const height = (Platform.OS === 'ios') ? 70 : 50

export default class ImagePicker extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {

           
        }
        
    }

    renderNavTitle() {
        return (
            <View style={{
                width: '100%', height: height, backgroundColor: commonColors.theme, justifyContent: 'center', alignItems: 'center',
                paddingTop: Platform.OS === 'ios' ? 20 : 0
            }}>
                <TouchableOpacity style={{ position: 'absolute', left: 15, top: 30 }} onPress={() => Actions.pop()}>
                    <Ionicons name="ios-arrow-back" color={'white'} size={30} />
                </TouchableOpacity>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Image Picker</Text>
                </View>
                {/* <TouchableOpacity style={{ position: 'absolute', right: 15, top: 35 }} onPress={()=>Actions.pop()}>
                    <Ionicons name="md-checkmark" size={20} color={'white'} />
                </TouchableOpacity> */}
            </View>
        )
    }

    renderMainInfo() {
        return (
            <View style={{ flex: 1 }}> 



            </View>

        )
    }

  

    render() {
        return (
            <View style={styles.container}>
                {this.renderNavTitle()}
                {this.renderMainInfo()}

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: commonColors.background
    },
    tabViewContainer: {
        flex: 1,
        backgroundColor: 'rgb(250,250,250)'
    },
    tabViewStateContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    tabViewItemTitle: {
        fontSize: 12,
        color: 'rgb(255,255,255)',
    },
    tabViewItemValue: {
        margin: 5,
        fontSize: 20,
        color: 'rgb(255,255,255)',
    },
    tabViewItemColor: {
        width: 8,
        height: 8,
    },
})