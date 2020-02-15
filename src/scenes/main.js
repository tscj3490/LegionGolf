'use strict';

import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    PermissionsAndroid,
    StatusBar,
    Platform,
    Modal,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import TabNavigator from 'react-native-tab-navigator';
import IonIcons from 'react-native-vector-icons/Ionicons'

import Home from './home/home';
import Players from './players/players';
import Chat from './chat/chat';
import Setting from './settings/setting';

import * as commonColors from '../styles/commonColors';
import * as commonStyles from '../styles/commonStyles';
import { screenWidth, screenHeight } from '../styles/commonStyles';


import gql from 'graphql-tag';
import { graphql, Query } from 'react-apollo';
const createUser = gql`
    mutation createUser($name: String!, $imageUrl: String!, $location: String!, $handicap: Int!, $stake: Int!) {
        createUser(name:$name, imageUrl: $imageUrl, location:$location, handicap: $handicap, stake: $stake){
            id
        }
    }
`;

const allUsers = gql`
    query {
        allUsers{
            id
            name
            imageUrl
            location
        } 
    }
`


class Main extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            selectedTab: 'home',

            time: '00:00:00',
            boardColor: 'white',
        };

        // this.props.mutate({
        //     variables: {
        //         name: "jacky0906",
        //         imageUrl: "https://leagion.team/img/team/master-s.jpg",
        //         location: "New York, NY",
        //         handicap: 10,
        //         stake: 1
        //     }
        // })
        //     .then((res) => {
        //         console.log('okay', res)
        //     })

        // this.props.mutate({})
        //     .then((res)=>{
        //         console.log(res)
        //     })
        console.log(props)
    }

    componentWillReceiveProps(nextProps) {
        console.log('------', nextProps)

    }

    componentDidMount() {
        this.hasMoundted = true
        this.time = 0;
        var interval = setInterval(() => {
            this.time++
            let hour = parseInt(this.time / 3600)
            let preHour = hour < 10 ? '0' : ''
            let minute = parseInt((this.time - hour * 3600) / 60)
            let preMinute = minute < 10 ? '0' : ''
            let second = this.time % 60
            let preSecond = second < 10 ? '0' : ''
            if ( this.hasMoundted == false) {
                clearInterval(interval)
                return;
            }
            this.setState({ time: preHour + hour + ':' + preMinute + minute + ':' + preSecond + second })

            if (this.time % 2 == 1) this.setState({ boardColor: 'black' }) 
            else this.setState({ boardColor: 'white' })
        }, 1000)
    }

    componentWillUnmount(){
        this.hasMoundted = false;
    }

    onSelectTab(tab) {
        this.setState({
            selectedTab: tab,
        });
    }

    render() {
        const ButtomComponent = () => <TouchableOpacity activeOpacity={0.8} onPress={()=>Actions.Score()} style={{
            height: 40, backgroundColor: commonColors.theme, width: '100%', alignItems: 'center',
            flexDirection: 'row', paddingHorizontal: 15
        }} >            
            <Text style={{ flex: 1, fontSize: 14, color: this.state.boardColor, fontWeight: 'bold', textAlign: 'center' }}>Score Board</Text>
            <Text style={{ position: 'absolute', left: 20, color: 'red', fontWeight: 'bold' }}>{this.state.time}</Text>
            {/* <Text style={{ color: 'white' }}>0(0/18)</Text> */}
        </TouchableOpacity>

        return (
            <View style={styles.container}>
                <TabNavigator tabBarShadowStyle={styles.tab}>
                    {/* HOME */}
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'home'}
                        selectedTitleStyle={styles.selectedText}
                        titleStyle={styles.text}
                        title="Home"
                        renderIcon={() => <IonIcons name="md-home" size={27} color={'grey'} />}
                        renderSelectedIcon={() => <IonIcons name="md-home" size={27} color={commonColors.theme} />}
                        onPress={() => this.onSelectTab('home')}>
                        <View style={{ flex: 1 }}>
                            <Home />
                            <ButtomComponent />
                        </View>
                    </TabNavigator.Item>
                    {/* PLAYERS */}
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'players'}
                        selectedTitleStyle={styles.selectedText}
                        titleStyle={styles.text}
                        title="Players"
                        renderIcon={() => <IonIcons name="ios-people" size={27} color={'grey'} />}
                        renderSelectedIcon={() => <IonIcons name="ios-people" size={27} color={commonColors.theme} />}
                        onPress={() => this.onSelectTab('players')}>
                        <View style={{ flex: 1 }}>
                            <Players />
                            <ButtomComponent />
                        </View>
                    </TabNavigator.Item>
                    {/* CHAT */}
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'chat'}
                        selectedTitleStyle={styles.selectedText}
                        titleStyle={styles.text}
                        title="Chat"
                        renderIcon={() => <IonIcons name="ios-chatbubbles" size={27} color={'grey'} />}
                        renderSelectedIcon={() => <IonIcons name="ios-chatbubbles" size={27} color={commonColors.theme} />}
                        onPress={() => this.onSelectTab('chat')}>
                        <View style={{ flex: 1 }}>
                            <Chat />
                            <ButtomComponent />
                        </View>
                    </TabNavigator.Item>
                    {/* ME */}
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'settings'}
                        selectedTitleStyle={styles.selectedText}
                        titleStyle={styles.text}
                        title="Settings"
                        renderIcon={() => <IonIcons name="md-settings" size={27} color={'grey'} />}
                        renderSelectedIcon={() => <IonIcons name="md-settings" size={27} color={commonColors.theme} />}
                        onPress={() => this.onSelectTab('settings')}>
                        <View style={{ flex: 1 }}>
                            <Setting />
                            <ButtomComponent />
                        </View>
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        );
    }
}

export default Main;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        width: screenWidth,
        height: screenHeight,
    },
    iconTabbarHome: {
        width: 27,
        height: 27,
    },
    iconTabbar: {
        width: 23,
        height: 23,
    },
    text: {
        fontSize: 10,
        fontWeight: 'bold'
    },
    selectedText: {
        color: commonColors.theme,
        fontSize: 10,
        fontWeight: 'bold'
    },
    tab: {
        borderStyle: 'solid',
        borderTopWidth: 1,
        borderTopColor: '#edefee',
        backgroundColor: 'white',
    }
});
