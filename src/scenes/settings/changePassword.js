
import React, { PureComponent } from 'react'

import {
    StyleSheet,
    View,
    Text,
    Platform,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native'

import { Actions } from 'react-native-router-flux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import * as commonColors from '../../styles/commonColors'
const height = 70

export default class ChangePassword extends PureComponent {
    constructor(props) {
        super(props)
        this.state={
            current:'',
            password:'',
            confirm:'',
        }
    }

    SignUp() {
        Actions.OwnerMain()
    }

    Back() {
        Actions.pop()
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                    <View style={{
                        width: '100%', height: height, backgroundColor: commonColors.theme, justifyContent: 'center', alignItems: 'center',
                        paddingTop: 20
                    }}>
                        <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>Change Password</Text>
                        <TouchableOpacity style={{ position: 'absolute', left: 15, top: 35 }} onPress={this.Back}>
                            <Text style={{ color: 'white', fontSize: 14 }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ position: 'absolute', right: 15, top: 35 }} onPress={this.Back}>
                            <Ionicons name="md-checkmark" size={20} color={'white'}/>
                        </TouchableOpacity>
                    </View>                
                    <ScrollView style={styles.container}>



                    <View style={{ paddingHorizontal: 15, marginTop: 30 }}>
                        <Text style={{ fontSize: 13, color: commonColors.normalText }}>Current Password</Text>
                        <TextInput
                            placeholder="Current Password"
                            placeholderTextColor={commonColors.placeText}
                            autoCapitalize="none"
                            autoCorrect={false}
                            underlineColorAndroid="transparent"
                            style={{
                                paddingHorizontal: 15,
                                borderColor: commonColors.placeText, borderWidth: 1,
                                height: 40, marginTop: 8,
                            }}
                        />
                    </View>
                    <View style={{ paddingHorizontal: 15, marginTop: 15 }}>
                        <Text style={{ fontSize: 13, color: commonColors.normalText }}>New Password</Text>
                        <TextInput
                            placeholder="New Password"
                            placeholderTextColor={commonColors.placeText}
                            autoCapitalize="none"
                            autoCorrect={false}
                            underlineColorAndroid="transparent"
                            style={{
                                paddingHorizontal: 15,
                                borderColor: commonColors.placeText, borderWidth: 1,
                                height: 40, marginTop: 8,
                            }}
                        />
                    </View>
                    <View style={{ paddingHorizontal: 15, marginTop: 15 }}>
                        <Text style={{ fontSize: 13, color: commonColors.normalText }}>Confirm Password</Text>
                        <TextInput
                            placeholder="Confirm Password"
                            placeholderTextColor={commonColors.placeText}
                            autoCapitalize="none"
                            autoCorrect={false}
                            underlineColorAndroid="transparent"
                            style={{
                                paddingHorizontal: 15,
                                borderColor: commonColors.placeText, borderWidth: 1,
                                height: 40, marginTop: 8,
                            }}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: commonColors.background
    }
})