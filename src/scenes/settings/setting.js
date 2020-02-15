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
    StatusBar,
    ImageBackground,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import IonIcons from 'react-native-vector-icons/Ionicons'

import * as commonColors from '../../styles/commonColors'
import * as commonStyles from '../../styles/commonStyles'
import { screenHeight, screenWidth } from '../../styles/commonStyles';
import Cache from '../../utils/cache'

export default class Setting extends PureComponent {
    constructor(props) {
        super(props);

        console.log('------', Cache)

        this.state = {
            userName: 'jacky chan',
            menus: [
                { iconName: 'ios-ribbon-outline', title: 'Games organized by me' },
                { iconName: 'ios-cash-outline', title: 'My Balance' },
                { iconName: 'ios-help-buoy-outline', title: 'Historical Performance' },
                { iconName: 'ios-settings-outline', title: 'Profile' },
                // { iconName: 'md-exit', title: 'Logout' },
            ],
            selectItem: -1,
            avatar: Cache.currentUser.imageUrl==null?commonStyles.userEmptyIcon:{uri:Cache.currentUser.imageUrl},
        }
    }

    connectItem(index) {
        switch (index) {
            case 0:
                Actions.MyGameList();
                break;
            case 1:
                Actions.MyBalance();
                break;
            case 3:
                Actions.Profile();
                break;
        }
    }

    renderItem(index) {
        let { iconName, title } = this.state.menus[index]
        return (
            <TouchableOpacity key={index} activeOpacity={1} onPress={() => this.connectItem(index)}
                onPressIn={() => { this.setState({ selectItem: index }) }} onPressOut={() => this.setState({ selectItem: -1 })}
                style={{
                    flexDirection: 'row', height: 60, width: '100%', alignItems: 'center',
                    backgroundColor: this.state.selectItem == index ? commonColors.background : 'white',
                    paddingHorizontal: 15, borderBottomColor:'#ccc', borderBottomWidth:0.5
                }}>
                <IonIcons name={iconName} size={25} color={commonColors.normalText} style={{ width: 25 }} />
                <Text style={{ fontSize: 15, color: commonColors.normalText, marginLeft: 10 }}>{title}</Text>

            </TouchableOpacity>
        )
    }

    EditAccount() {
    }

    renderProfile() {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 15 }}>
                <Image source={this.state.avatar} style={{ width: 100, height: 100, borderRadius: 50 }}>
                    {/* <View style={styles.editAvatar}>
                        <IonIcons name="ios-create-outline" size={20} color={'white'} />
                    </View> */}
                </Image>
                <Text style={{ color: commonColors.normalText, fontSize: 18, fontWeight: 'bold', marginTop: 15 }}>
                    {this.state.userName}
                </Text>
                <TouchableOpacity activeOpacity={0.8} onPress={() => this.EditAccount()}
                    style={styles.editButton}>
                    <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>Edit account</Text>
                </TouchableOpacity>

            </View>
        )
    }

    renderHeader() {
        return (
            <View style={styles.navigationBarWrap}>
                <View style={styles.titleBarWrap}>
                    <Text style={styles.textTitle}>Profile</Text>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', height: 50, width: '100%', alignItems: 'center', justifyContent: 'center', borderBottomColor: '#ccc', borderBottomWidth: 0.5 }}>
                    <Text style={{ color: commonColors.theme, fontSize: 28, fontWeight: 'bold' }}>Lea</Text>
                    <Image source={commonStyles.logo} style={{ width: 70, height: 44 }} />
                    <Text style={{ color: commonColors.theme, fontSize: 28, fontWeight: 'bold' }}>gion</Text>
                    <Image source={this.state.avatar} style={{ position: 'absolute', left: 10, width: 40, height: 40, borderRadius: 20 }} />
                </View>
                {/* {this.renderHeader()} */}
                {/* {this.renderProfile()} */}
                {/* <View style={{ backgroundColor: commonColors.background, height: 15, width: '100%' }} /> */}
                <ScrollView>
                    <View style={{ backgroundColor: 'white' }}>
                        {this.state.menus.map((item, index) => {
                            return this.renderItem(index)
                        })}
                    </View>
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
    headerContainer: {
        flexDirection: 'row',
        height: 80,
        backgroundColor: 'white',
        //justifyContent:'center',
        alignItems: 'center',
    },
    editAvatar: {
        height: 30,
        width: 30,
        borderRadius: 15,
        backgroundColor: commonColors.theme,
        position: 'absolute',
        right: 0,
        top: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    editButton: {
        backgroundColor: commonColors.theme,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        height: 28,
        width: 108
    },
    navigationBarWrap: {
        flexDirection: 'row',
        backgroundColor: commonColors.menu,
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: '#d8d8da',
        height: (Platform.OS === 'android') ? 44 : 64,
        paddingTop: (Platform.OS === 'android') ? 0 : 20,
    },
    titleBarWrap: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textTitle: {
        color: commonColors.normalText,
        //fontFamily: 'openSans',
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
    },
})
