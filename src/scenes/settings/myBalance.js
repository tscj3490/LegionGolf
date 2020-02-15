
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
    ActivityIndicator,
    Clipboard
} from 'react-native'

import { Actions } from 'react-native-router-flux'
import IonIcons from 'react-native-vector-icons/Ionicons'
import * as commonColors from '../../styles/commonColors'
import * as commonStyles from '../../styles/commonStyles'
import QRCode from 'react-native-qrcode-svg'

import gql from 'graphql-tag'
import { Query } from 'react-apollo'

import Cache from '../../utils/cache'

const height = (Platform.OS === 'ios') ? 70 : 50

const getBalance = gql`
    query getBalance($accountid: String!){
        walletByAccountid(accountid: $accountid){
            nodeId
            balance
            active
            accountid
        }
    }
`

export default class MyBalance extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {

            BalanceVal: props.balance,
            walletAddr: Cache.currentUser.accountid,

            rateItems: [
                { title: 'DAL/USD', value: '20', color: commonColors.rateTheme1 },
                { title: 'DAL/XLM', value: '43', color: commonColors.rateTheme2 },
                { title: 'DAL/ETH', value: '12', color: commonColors.rateTheme3 }
            ],
            isCopy: false,
        }
        this.state.max = 64
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
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>My Balance</Text>
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
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    {this.state.rateItems.map((item, index) => {
                        return (
                            <View key={index} style={[styles.tabViewStateContainer, { backgroundColor: item.color }]}>
                                <Text style={styles.tabViewItemTitle}>{item.title}</Text>
                                <Text style={styles.tabViewItemValue}>{item.value}</Text>
                            </View>

                        )
                    })}
                </View>

                <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', height: 44, paddingHorizontal: 15 }}>
                    <Text style={{ fontSize: 15, color: '#333' }}>My Balance : </Text>
                    <View style={{ flex: 1 }} />
                    <Query query={getBalance} variables={{accountid:this.state.walletAddr}}>
                        {({ loading, error, data }) => {
                            if (error) return <Error />
                            if (loading || !data) return <ActivityIndicator />
                            return <Text style={{ fontSize: 16, color: '#111', fontWeight: 'bold' }}>{data.walletByAccountid.balance}</Text>
                        }}
                    </Query>
                </View>


                <TouchableOpacity onPress={() => Actions.PastTransactions()} style={{
                    marginTop: 8, flexDirection: 'row', alignItems: 'center',
                    paddingHorizontal: 15, backgroundColor: 'white', height: 44
                }}>
                    <Text style={{ fontSize: 14, color: '#333' }}>Past Transactions</Text>
                    <View style={{ flex: 1 }} />
                    {/* <Text style={{ fontSize: 14, color: 'black', marginRight:15 }}>{this.state.countOfTrans}</Text> */}
                    <IonIcons name="ios-arrow-forward" color='#333' size={20} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => Actions.Transfer()} style={{
                    marginTop: 8, flexDirection: 'row', alignItems: 'center',
                    paddingHorizontal: 15, backgroundColor: 'white', height: 44
                }}>
                    <Text style={{ fontSize: 14, color: '#333' }}>Transfer</Text>
                    <View style={{ flex: 1 }} />
                    {/* <Text style={{ fontSize: 14, color: 'black', marginRight:15 }}>{this.state.countOfTrans}</Text> */}
                    <IonIcons name="ios-arrow-forward" color='#333' size={20} />
                </TouchableOpacity>

                {/* <View style={{marginVertical: 20}}>
                    {this.state.rateItems.map((item, index) => {
                        let percent = 100 * parseFloat(item.value) / parseFloat(this.state.max)
                        return (
                            <View key={index} style={{height: 12, backgroundColor: item.color, width: percent + '%'}} />
                        )
                    })}
                </View> */}

                <View style={{ flexDirection: 'row', marginTop: 10, backgroundColor: '#fff', padding: 15 }}>
                    <Text style={{ fontSize: 14, color: '#333', marginTop: 5 }}>Wallet Address : </Text>
                    <View style={{ flex: 1, marginLeft: 10, marginTop: 5 }}>
                        <Text style={{ fontSize: 14, color: '#111' }}>{this.state.walletAddr}</Text>
                        <View style={{ marginTop: 20 }}>
                            <QRCode value={this.state.walletAddr} size={120} />
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => this.Copy()} style={{
                        borderWidth: 1, borderColor: commonColors.theme,
                        height: 28, justifyContent: 'center', alignItems: 'center', width: 70
                    }}>
                        <Text style={{ fontSize: 12, color: commonColors.theme }}>Copy</Text>
                    </TouchableOpacity>
                </View>

                {this.state.isCopy && <View style={{
                    flexDirection: 'row', width: '100%', height: 46, backgroundColor: commonColors.rateTheme1,
                    alignItems: 'center', padding: 15, marginTop: 5
                }}>
                    <Text style={{ fontSize: 16, color: '#fff', flex: 1 }}>Wallet address is copied.</Text>
                    <TouchableOpacity onPress={() => this.setState({ isCopy: false })}>
                        <IonIcons name='ios-close' color={'#fff'} size={30} style={{ height: 30 }} />
                    </TouchableOpacity>
                </View>}
            </View>

        )
    }

    Copy() {
        var buffer = this.state.walletAddr
        this.setState({ isCopy: true })
        setTimeout(() => { this.setState({ isCopy: false }) }, 2000)
        Clipboard.setString(buffer)
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