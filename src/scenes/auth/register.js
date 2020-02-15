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
import Api from '../../services/Api'
import * as config from '../../config'

import gql from 'graphql-tag';
import { graphql, Query, withApollo } from 'react-apollo';
const createUser = gql`
    mutation createUser($keybaseid: String!, $location: String!, $avatar: String!, $accountid: String!) {
        createWallet(input: {wallet: {accountid: $accountid}}) {
            wallet {
              accountid
            }
        }
        createUser(input:{
            user:{
                keybaseid: $keybaseid,
                location: $location,
                imageUrl: $avatar,
                accountid: $account,
            }
        }){
            user {
                location
                imageUrl
                keybaseid
                accountid
            }
        }
    }
`;


class Signup extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            accountid: '',
            isWaiting: false,
            rightCallback: null,
        };
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    next() {
        this.setState({ isWaiting: true })
        Api.keybaseLogin(this.state.email, this.state.password, (err, res) => {
            this.setState({ isWaiting: false })
            if (err == null) {
                
            } else {
                setTimeout(() => Alert.alert("Invalid credentials. Please input your keybase ID and passphrase correctly!"), 100)
            }
        })
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
                        title={'Sign up'}
                        rightText={'NEXT'}
                        rightCallback={this.state.rightCallback}
                    />
                    <View style={styles.content}>

                        <View style={styles.inputContainer}>
                            <View style={styles.inputTitle}>
                                <Text style={styles.inputTitleText}>Keybase ID</Text>
                            </View>
                            <View style={styles.input}>
                                <TextInput
                                    ref="mobile"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    placeholder="It will be a username"
                                    secureTextEntry={false}
                                    placeholderTextColor={commonColors.placeholderText}
                                    textAlign="left"
                                    style={styles.inputText}
                                    underlineColorAndroid="transparent"
                                    returnKeyType={'next'}
                                    keyboardType="number-pad"
                                    value={this.state.mobile}
                                    onChangeText={(text) => {
                                        this.setState({ mobile: text.replace(/\t/g, '') })
                                        if (text != '' && this.state.password != '' && this.state.email != '') {
                                            this.setState({ rightCallback: this.next.bind(this) })
                                        } else {
                                            this.setState({ rightCallback: null })
                                        }
                                    }}
                                    onSubmitEditing={() => this.refs.password.focus()}
                                />

                            </View>
                        </View>
                        <View style={styles.inputContainer}>
                            <View style={styles.inputTitle}>
                                <Text style={styles.inputTitleText}>Passphrase</Text>
                            </View>
                            <View style={styles.input}>
                                <TextInput
                                    ref="Passphrase"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    placeholder="please enter your passphrase of keybase"
                                    secureTextEntry={true}
                                    placeholderTextColor={commonColors.placeholderText}
                                    textAlign="left"
                                    style={styles.inputText}
                                    underlineColorAndroid="transparent"
                                    returnKeyType={'go'}
                                    value={this.state.password}
                                    onChangeText={(text) => {
                                        this.setState({ password: text.replace(/\t/g, '') })
                                        if (text != '' && this.state.email != '' && this.state.mobile != '') {
                                            this.setState({ rightCallback: this.next.bind(this) })
                                        } else {
                                            this.setState({ rightCallback: null })
                                        }
                                    }}
                                    onSubmitEditing={() => this.refs.email.focus()}
                                />

                            </View>
                        </View>
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
                                        if (text != '' && this.state.password != '' && this.state.mobile != '') {
                                            this.setState({ rightCallback: this.next.bind(this) })
                                        } else {
                                            this.setState({ rightCallback: null })
                                        }
                                    }}
                                    onSubmitEditing={() => this.refs.wallet.focus()}
                                />
                            </View>
                        </View>

                        <View style={styles.inputContainer}>
                            <View style={styles.inputTitle}>
                                <Text style={styles.inputTitleText}>Wallet Address</Text>
                            </View>
                            <View style={styles.input}>
                                <TextInput
                                    ref="wallet"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    placeholder="Wallet Address"
                                    placeholderTextColor={commonColors.placeholderText}
                                    textAlign="left"
                                    style={styles.inputText}
                                    underlineColorAndroid="transparent"
                                    returnKeyType={'next'}
                                    // keyboardType="email-address"
                                    value={this.state.accountid}
                                    onChangeText={(text) => {
                                        this.setState({ email: text.replace(/\t/g, '') })
                                        if (text != '' && this.state.email != '' && this.state.accountid != '') {
                                            this.setState({ rightCallback: this.next.bind(this) })
                                        } else {
                                            this.setState({ rightCallback: null })
                                        }
                                    }}
                                    onSubmitEditing={() => this.next()}
                                />
                            </View>
                        </View>

                        <View style={styles.descriptionContainer}>
                            <Text style={styles.description}>
                                We use your email and mobile number to send you order confirmation and receipts.
                    </Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default withApollo(Signup)

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
        height: 78,
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
