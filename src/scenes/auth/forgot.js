'use strict';

import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Keyboard,
    TouchableWithoutFeedback,
    Alert,
} from 'react-native';


import { Actions } from 'react-native-router-flux';

import * as commonStyles from '../../styles/commonStyles'
import * as commonColors from '../../styles/commonColors';
import { screenWidth, screenHeight } from '../../styles/commonStyles';

import NavTitleBar from '../../components/navTitle'


export default class Forgot extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
        };
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    next() {
    }

    goBack() {
        Actions.pop();
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <NavTitleBar
                    buttons={commonStyles.NavBackButton}
                    onBack={this.goBack}
                    title={'Forgot Password'}
                />
                <View style={styles.contentTitle}>
                    <Text style={[styles.contentTitleText, {justifyContent: 'center', alignItems: 'center'}]}>
                        Please enter the email address registered {"\n\n"}                       on your account.
                    </Text>
                </View>
                <View style={styles.content}>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputTitle}>
                            <Text style={styles.inputTitleText}>Email</Text>
                        </View>
                        <View style={styles.input}>
                            <TextInput
                                ref="email"
                                autoCapitalize="none"
                                autoCorrect={false}
                                placeholder="name@example.com"
                                placeholderTextColor={commonColors.placeholderText}
                                textAlign="left"
                                style={styles.inputText}
                                underlineColorAndroid="transparent"
                                returnKeyType={'next'}
                                keyboardType="email-address"
                                value={this.state.email}
                                onChangeText={(text) => {
                                    this.setState({ email: text.replace(/\t/g, '') })
                                    if ( text != '' && this.state.password != '' && this.state.mobile != '' ){
                                        this.setState({ rightCallback: this.next.bind(this)})
                                    }else{
                                        this.setState({ rightCallback: null})
                                    }
                                }}
                                onSubmitEditing={() => this.refs.password.focus()}
                            />
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={{height:44, borderRadius:3, backgroundColor:'black', alignItems:'center', justifyContent:'center', margin:8}}>
                    <Text style={{fontSize:14, color:'white', fontWeight:'bold'}}>NEXT</Text>
                </TouchableOpacity>
            </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: commonColors.background,
    },
    content: {
        paddingTop: 16,
        paddingHorizontal: 8,
    },
    contentTitle: {
        height: 65,
        paddingTop: 20,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentTitleText: {
        fontSize: 12,
        color: commonColors.normalText,
    },
    inputContainer: {
        flexDirection: 'row',
        height: 48,
        width: '100%',
        borderColor: commonColors.borderColor,
        borderWidth: 0.5,
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    descriptionContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
    },
    description: {
        fontSize: 12,
        color: commonColors.textColor2,
        textAlign: 'center'
    },
    inputTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    input: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    inputTitleText: {
        color: commonColors.textColor1,
        fontSize: 15,
        fontWeight: 'bold'
    },
    inputText: {
        fontSize: 14,
        color: 'black',
        height: 50,
        alignSelf: 'stretch',
        marginLeft: 15,
        marginRight: 40,
    }
});
