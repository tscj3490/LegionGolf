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
    Alert,
    Modal,
    TextInput,
    ActivityIndicator
} from 'react-native';

import { Actions, ActionConst, Scene, Router } from 'react-native-router-flux';
import IonIcons from 'react-native-vector-icons/Ionicons'
import StarRatingBar from 'react-native-star-rating-view/StarRatingBar'

import * as commonColors from '../../styles/commonColors'
import * as commonStyles from '../../styles/commonStyles'
import { screenHeight, screenWidth } from '../../styles/commonStyles';
const height = (Platform.OS === 'ios') ? 70 : 50

import gql from 'graphql-tag';
import { graphql, Query } from 'react-apollo';

const allUsers = gql`
    query {
        allUsers {
            nodes{
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
            }
        }
    }
` 

export default class Players extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            players: [
                { name: 'jacky chan', email: 'fox0905@oultook.com', players: 4, handicap: 11, location: 'Golf Tokyo Japan', time: '12 June, 2018 10:30 AM', price: 3, rating: 3.6 },
                { name: 'jacky chan', email: 'fox0905@oultook.com', players: 4, handicap: 18, location: 'Golf Tokyo Japan', time: '12 June, 2018 10:30 AM', price: 3, rating: 3.6 },
                { name: 'jacky chan', email: 'fox0905@oultook.com', players: 4, handicap: 43, location: 'Golf Tokyo Japan', time: '12 June, 2018 10:30 AM', price: 3, rating: 3.6 },
                { name: 'jacky chan', email: 'fox0905@oultook.com', players: 4, handicap: 3, location: 'Golf Tokyo Japan', time: '12 June, 2018 10:30 AM', price: 3, rating: 3.6 },
            ],
            favorites: [
                { name: 'jacky chan', rating: 3.6 },
                { name: 'jacky chan', rating: 3.6 },
                { name: 'jacky chan', rating: 3.6 },
                { name: 'jacky chan', rating: 3.6 },

                { name: 'jacky chan', rating: 3.6 },

            ],
            showOptions: false,
            changed: false            
        }
    }

    componentDidMount() {
        console.log('------', this.props)
        // this.props.query({
        //     query: allUser,
        //     variables:  
        // })
    }

    filtering() {
        this.setState({ showOptions: true, changed: false })
    }

    renderFilteringModal() {
        return (
            <Modal visible={this.state.showOptions} onRequestClose={() => { }} animationType="slide">
                <View>
                    <View style={{
                        width: '100%', height: height, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center',
                        paddingTop: Platform.OS === 'ios' ? 20 : 0, borderBottomColor: '#ccc', borderBottomWidth: 0.5,
                    }}>
                        <TouchableOpacity style={{ position: 'absolute', left: 15, top: 26 }} onPress={() => this.setState({ showOptions: false })}>
                            <IonIcons name="ios-arrow-round-back" color={'#333'} size={40} style={{ height: 30 }} />
                        </TouchableOpacity>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>Filtering Options</Text>
                        </View>
                        {this.state.changed && <TouchableOpacity style={{ position: 'absolute', right: 15, top: 30 }} onPress={() => this.setState({ showOptions: false })}>
                            <IonIcons name="ios-checkmark-circle" color={commonColors.theme} size={26} />
                        </TouchableOpacity>}
                    </View>
                    <View>
                        <View style={{ paddingHorizontal: 15, marginTop: 15 }}>
                            <Text style={{ fontSize: 12, color: commonColors.normalText }}>Name</Text>
                            <TextInput
                                placeholder="Name"
                                placeholderTextColor={commonColors.placeText}
                                autoCapitalize="none"
                                autoCorrect={false}
                                underlineColorAndroid="transparent"
                                style={{
                                    paddingHorizontal: 15,
                                    borderColor: commonColors.placeText, borderWidth: 1,
                                    height: 40, marginTop: 8,
                                }}
                                onChangeText={(text) => { this.setState({ changed: true }) }}
                            />
                        </View>
                        <View style={{ paddingHorizontal: 15, marginTop: 30 }}>
                            <Text style={{ fontSize: 12, color: commonColors.normalText }}>Location</Text>
                            <TextInput
                                placeholder="Location"
                                placeholderTextColor={commonColors.placeText}
                                autoCapitalize="none"
                                autoCorrect={false}
                                underlineColorAndroid="transparent"
                                style={{
                                    paddingHorizontal: 15,
                                    borderColor: commonColors.placeText, borderWidth: 1,
                                    height: 40, marginTop: 8,
                                }}
                                onChangeText={(text) => { this.setState({ changed: true }) }}
                            />
                        </View>
                        <View style={{ paddingHorizontal: 15, marginTop: 15 }}>
                            <Text style={{ fontSize: 12, color: commonColors.normalText }}>Handicap Range</Text>
                            <View style={{ marginTop: 8, flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput
                                    placeholder="Min."
                                    placeholderTextColor={commonColors.placeText}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    underlineColorAndroid="transparent"
                                    style={{
                                        paddingHorizontal: 15,
                                        borderColor: commonColors.placeText, borderWidth: 1,
                                        height: 40, flex: 1,
                                    }}
                                    onChangeText={(text) => { this.setState({ changed: true }) }}
                                />
                                <Text style={{ fontSize: 12, color: commonColors.normalText }}> to </Text>
                                <TextInput
                                    placeholder="Max."
                                    placeholderTextColor={commonColors.placeText}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    underlineColorAndroid="transparent"
                                    style={{
                                        paddingHorizontal: 15,
                                        borderColor: commonColors.placeText, borderWidth: 1,
                                        height: 40, flex: 1,
                                    }}
                                    onChangeText={(text) => { this.setState({ changed: true }) }}
                                />
                            </View>
                        </View>
                        <View style={{ paddingHorizontal: 15, marginTop: 15 }}>
                            <Text style={{ fontSize: 12, color: commonColors.normalText }}>Distance</Text>
                            <TextInput
                                placeholder="Km"
                                placeholderTextColor={commonColors.placeText}
                                autoCapitalize="none"
                                autoCorrect={false}
                                underlineColorAndroid="transparent"
                                style={{
                                    paddingHorizontal: 15,
                                    borderColor: commonColors.placeText, borderWidth: 1,
                                    height: 40, marginTop: 8,
                                }}
                                onChangeText={(text) => { this.setState({ changed: true }) }}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    renderPlayer() {
        if (this.state.players.length == 0) return null
        return (
            <View style={{ padding: 15 }}>
                <Query query={allUsers} pollInterval={500}>
                    {({ loading, error, data }) => {
                        console.log('----', loading, error, data)
                        if (loading) return <ActivityIndicator />
                        if (error) return <Text>Error ocurrs{error}</Text>
                        
                        return data.allUsers.nodes.map((item, index) => { 
                            return (
                                <View key={index} activeOpacity={0.7} style={{
                                    backgroundColor: 'white', shadowOpacity: 'black', shadowRadius: 2, width: '100%',
                                    shadowOffset: { width: 1, height: 1 }, shadowOpacity: 0.4, borderRadius: 3, padding: 15, marginTop: 15
                                }}>
                                    <View style={{ flexDirection: 'row', }}>
                                        <Image source={{uri:item.imageUrl}} style={{ height: 40, width: 40, borderRadius: 20 }} />
                                        <View style={{ marginLeft: 10, overflow: 'hidden', flex: 1, justifyContent: 'center' }}>
                                            <Text numberOfLines={1} style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>{item.keybaseid}</Text>
                                            <View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>

                                                <StarRatingBar
                                                    dontShowScore={true}
                                                    score={Number(item.rating)}
                                                    spacing={3}
                                                    readOnly={true}
                                                    // continuous={true}
                                                    allowsHalfStars={true}
                                                    accurateHalfStars={true}
                                                    starStyle={{
                                                        width: 12,
                                                        height: 12,
                                                    }}
                                                />
                                                <Text style={{ fontSize: 12, marginLeft: 5, width: 20 }}>{Number(item.rating).toFixed(1)}</Text>
                                            </View>
                                            {/* <Text numberOfLines={1} style={{ fontSize: 13, color: '#555', marginTop: 8 }}>{item.email}</Text> */}
                                        </View>
                                        <TouchableOpacity onPress={() => Actions.ChatView()}>
                                            <IonIcons name="ios-chatbubbles" color={commonColors.theme} size={20} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                        <Text style={{ fontSize: 14, color: '#333' }}>Handicap : </Text>
                                        <Text style={{ fontSize: 14, color: '#999' }}>{item.handicap} </Text>
                                        <View style={{ flex: 1 }} />
                                        <TouchableOpacity onPress={() => Actions.PlayerDetail({...item})}>
                                            <Text style={{ color: commonColors.theme, fontSize: 15 }}>View Detail</Text> 
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        })
                    }}
                </Query>
            </View>
        )
    }

    renderFavorites() {
        return (
            <View>
                <Text style={{ color: '#333', fontSize: 20, marginTop: 20, marginLeft: 15 }}>Favorite Players</Text>
                <ScrollView
                    horizontal={true}
                    style={{ backgroundColor: commonColors.background, height: 150, marginTop: 15 }}
                >
                    {this.state.favorites.map((item, index) => <TouchableOpacity onPress={() => Actions.PlayerDetail()}
                        key={index} activeOpacity={0.7}
                        style={{
                            justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', marginLeft: 15,
                            paddingHorizontal: 10, marginVertical: 20, shadowOpacity: 'black', shadowRadius: 2,
                            shadowOffset: { width: 1, height: 1 }, shadowOpacity: 0.4
                        }}>
                        <Image source={commonStyles.userEmptyIcon} style={{ width: 40, height: 40, borderRadius: 20 }} />
                        <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center', justifyContent: 'center' }}>

                            <StarRatingBar
                                dontShowScore={true}
                                score={item.rating}
                                spacing={2}
                                readOnly={true}
                                // continuous={true}
                                allowsHalfStars={true}
                                accurateHalfStars={true}
                                starStyle={{
                                    width: 10,
                                    height: 10,
                                }}
                            />
                            <Text style={{ fontSize: 12, marginLeft: 5, width: 20 }}>{item.rating.toFixed(1)}</Text>
                        </View>
                        <Text style={{ fontSize: 13, color: commonColors.theme, marginTop: 5 }}>{item.name}</Text>
                    </TouchableOpacity>)}
                </ScrollView>
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
                </View>
                <TouchableOpacity onPress={() => this.filtering()} activeOpacity={0.7}
                    style={{
                        justifyContent: 'center', alignItems: 'center', height: 44, width: '100%', borderBottomColor: '#ccc',
                        borderBottomWidth: 0.5, flexDirection: 'row'
                    }}>
                    <Text style={{ color: '#333', fontSize: 12 }}>FILTERING OPTIONS</Text>
                    <IonIcons name="ios-arrow-down" size={18} color={'#333'} style={{ marginLeft: 5 }} />
                    <IonIcons name="ios-options" size={24} color={commonColors.theme} style={{ left: 10, top: 10, position: 'absolute' }} />
                </TouchableOpacity>
                <ScrollView style={{ flex: 1 }}>
                    {this.renderFavorites()}
                    {this.renderPlayer()}
                </ScrollView>
                {this.renderFilteringModal()}
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
