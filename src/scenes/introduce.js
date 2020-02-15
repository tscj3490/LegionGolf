'use strict';

import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    PermissionsAndroid,
    StatusBar,
    Platform,
    ImageBackground
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import * as commonStyles from '../styles/commonStyles'
import * as commonColors from '../styles/commonColors'

export default class Introduce extends PureComponent {
    constructor(props) {
        super(props);

    }

    onLogin() {
        Actions.Login();
    }

    onRegister() {
        Actions.Register();
    }

    render() {
        return (
            <View>
                <ImageBackground
                    source={commonStyles.intro}
                    style={styles.background}
                >
                    <View style={{ flex: 1 }} />

                    <TouchableOpacity
                        style={styles.login}
                        onPress={() => this.onLogin()}>
                        <Text style={styles.loginText}>Log in with Keybase</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.register}
                        onPress={() => this.onRegister()}>
                        <Text style={styles.registerText}>Register</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        width: commonStyles.screenWidth,
        height: commonStyles.screenHeight,
    },
    loginText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        //fontFamily: 'openSans',
    },
    registerText: {
        fontSize: 12,
        //fontFamily: 'openSans',
        fontWeight: 'bold',
        color: commonColors.theme
    },
    login: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 48,
        backgroundColor: commonColors.theme,
        borderRadius: 3,
        marginHorizontal: 8,
        marginVertical: 5
    },
    register: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 46,
        marginHorizontal: 8,
        marginBottom: (Platform.OS === 'android') ? 30 : 5
    },
});