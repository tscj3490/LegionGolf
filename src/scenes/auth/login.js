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
    ActivityIndicator,
    Modal,
} from 'react-native';


import { Actions } from 'react-native-router-flux';

import * as commonStyles from '../../styles/commonStyles'
import * as commonColors from '../../styles/commonColors';
import { screenWidth, screenHeight } from '../../styles/commonStyles';

import Api from '../../services/Api'
import * as config from '../../config'
import Cache from '../../utils/cache'

import NavTitleBar from '../../components/navTitle'


import gql from 'graphql-tag';
import { graphql, Query, withApollo } from 'react-apollo';
 
const getUser = gql`
    query getUser($keybaseid: String!) {
        userByKeybaseid(keybaseid: $keybaseid){
            nodeId
            location
            imageUrl
            about
            keybaseid
            handicap
            accountid
            rating
            gender
            fullName
            age
        }
    }
`


class Login extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            email: this.props.email || '',
            password: this.props.password || '',
            rightCallback: null,
            isWaiting: false
        };
        // if ( this.props.email && this.props.password ){
        //     this.Done()
        // }
    }

    componentDidMount() {
        console.log(this.props)
    }

    componentWillUnmount() {
    }

    onForgotPassword() {
        Actions.Forgot()
    }

    onCreateAccount() {
        Actions.Register();
    }

    onToggleConfirmPassword() {
    }

    goBack() {
        Actions.Introduce();
    }

    Done() {
        this.setState({ isWaiting: true })
        Api.keybaseLogin(this.state.email, this.state.password, (err, res) => {
            this.setState({ isWaiting: false })
            if (err == null) {
                this.props.client.query({
                    query: getUser,
                    variables: { keybaseid: this.state.email }
                }).then((res) => {
                    console.log(res)
                    if (res.data.userByKeybaseid == null) {
                        setTimeout(() => Alert.alert("This keybase ID is not registered. Please register with this ID!"), 100)
                    } else {
                        Cache.currentUser = res.data.userByKeybaseid
                        console.log(Cache, res)
                        Actions.Main()
                    }
                })
            } else {
                setTimeout(() => Alert.alert("Invalid credentials. Please input your keybase ID and passphrase correctly!"), 100)
            }
        })
    }

    renderIndicator() {
        return (
            <Modal visible={this.state.isWaiting} transparent={true}>
                <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0,0.5)', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{
                        width: 80, height: 80, borderRadius: 5, shadowColor: 'black', alignItems: 'center', justifyContent: 'center',
                        shadowOffset: { width: 2, height: 2 }, shadowOpacity: 0.4, shadowRadius: 3, backgroundColor: 'white'
                    }}>
                        <ActivityIndicator size="large" />
                    </View>
                </View>
            </Modal>
        )
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <NavTitleBar
                        buttons={commonStyles.NavBackButton}
                        onBack={this.goBack}
                        title={'Sign in'}
                        rightText={'DONE'}
                        rightCallback={this.state.rightCallback}
                    />
                    <View style={styles.contentTitle}>
                        <Text style={styles.contentTitleText}>
                            LOG IN WITH YOUR KEYBASE ACCOUNT
                    </Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputTitle}>
                            <Text style={styles.inputTitleText}>Keybase ID</Text>
                        </View>
                        <View style={styles.input}>
                            <TextInput
                                ref="email"
                                autoCapitalize="none"
                                autoCorrect={false}
                                placeholder="Keybase username"
                                placeholderTextColor={commonColors.placeholderText}
                                textAlign="left"
                                style={styles.inputText}
                                underlineColorAndroid="transparent"
                                returnKeyType={'next'}
                                keyboardType="email-address"
                                value={this.state.email}
                                onChangeText={(text) => {
                                    this.setState({ email: text.replace(/\t/g, '') })
                                    if (text != '' && this.state.password != '') {
                                        this.setState({ rightCallback: this.Done.bind(this) })
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
                                ref="password"
                                autoCapitalize="none"
                                autoCorrect={false}
                                placeholder="Passphrase"
                                secureTextEntry={true}
                                placeholderTextColor={commonColors.placeholderText}
                                textAlign="left"
                                style={styles.inputText}
                                underlineColorAndroid="transparent"
                                returnKeyType={'go'}
                                value={this.state.password}
                                onChangeText={(text) => {
                                    this.setState({ password: text.replace(/\t/g, '') })
                                    if (this.state.email != '' && text != '') {
                                        this.setState({ rightCallback: this.Done.bind(this) })
                                    } else {
                                        this.setState({ rightCallback: null })
                                    }
                                }}
                                onSubmitEditing={() => this.Done()}
                            />
                        </View>
                    </View>

                    <View style={styles.forgot}>
                        <TouchableOpacity style={{ marginTop: 25 }} onPress={() => this.onForgotPassword()}>
                            <Text style={styles.forgotText}>
                                FORGOT PASSWORD?
                        </Text>
                        </TouchableOpacity>
                        <View style={{ flex: 1 }} />
                        <TouchableOpacity style={styles.register}
                            onPress={() => Actions.Register()}>
                            <Text style={styles.registerText}>REGISTER</Text>
                        </TouchableOpacity>
                    </View>
                    {/*<Image
                    style={{ width: '100%', height: '100%' }}
                    source={commonStyles.signinImg}
                />*/}
                    {this.renderIndicator()}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default withApollo(Login)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: commonColors.background,
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
    forgot: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    forgotText: {
        fontSize: 10,
        color: commonColors.theme,
        fontWeight: 'bold',
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
        marginHorizontal: 20,
    },
    register: {
        marginBottom: 35,
        borderWidth: 1,
        borderColor: commonColors.normalText,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 7,
    },
    registerText: {
        color: commonColors.normalText,
        fontSize: 13,
        fontWeight: 'bold'
    }
});
