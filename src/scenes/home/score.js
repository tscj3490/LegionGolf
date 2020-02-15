
import React, { PureComponent } from 'react'

import {
    StyleSheet,
    View,
    Text,
    Platform,
    TouchableOpacity,
    ScrollView,
    Image,
    KeyboardAvoidingView,
    TextInput,
    Modal,
} from 'react-native'


// import { GiftedChat } from 'react-native-gifted-chat'
// import {Ionicons} from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux'
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as commonColors from '../../styles/commonColors'
import * as commonStyles from '../../styles/commonStyles'
import StarRatingBar from 'react-native-star-rating-view/StarRatingBar'
// import {BlurView} from 'expo'

const height = 70

export default class Score extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            scorelist: [
                { name: 'John Won', score: '123', rating: 5 },
                { name: 'Alex', score: '134', rating: 5 },
                { name: 'Master-S', score: '142', rating: 5 },
                { name: 'leagion golf tester1', score: '112', rating: 5 },
                { name: 'tester2', score: '154', rating: 5 },
                { name: 'tian da ge', score: '131', rating: 5 },
                { name: 'hello world', score: '125', rating: 5 },
            ],
            isEditScore: false,
            isEditing: this.props.disabled,
        }
    }


    renderHeader() {
        return (
            <View style={{
                width: '100%', height: height, backgroundColor: commonColors.theme, justifyContent: 'center', alignItems: 'center',
                paddingTop: Platform.OS === 'ios' ? 20 : 0
            }}>
                <TouchableOpacity style={{ position: 'absolute', left: 15, top: 30 }} onPress={() => Actions.pop()}>
                    <Ionicons name="ios-arrow-back" color={'white'} size={30} />
                </TouchableOpacity>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Score Card</Text>
                </View>
                {/* {!this.props.disabled && <TouchableOpacity style={{ position: 'absolute', right: 15, top: 38 }} onPress={() => Actions.MyScore()}>
                    
                    <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>MY SCORE</Text>
                </TouchableOpacity>} */}
            </View>
        )
    }

    clickItem(item, index) {
        item.isEditScore = !item.isEditScore

        this.setState({ scorelist: [...this.state.scorelist], isEditing: !this.state.isEditing })
    }
    changeScore(score, item, index) {
        item.score = score
        this.setState({ scorelist: [...this.state.scorelist] })
    }
    changeRating(rating, item, index) {
        item.rating = rating
        this.setState({ scorelist: [...this.state.scorelist] })
    }

    renderBody() {
        return (
            <View style={{flex: 1}}>
                <View style={{ flexDirection: 'row', backgroundColor: '#ddd', alignItems: 'center', paddingHorizontal: 15, height: 44 }}>

                    <Text style={{ flex: 1, fontSize: 12 }} >Name</Text>
                    <Text style={{ flex: 0.7, fontSize: 12, textAlign: 'center' }}>Over/Under</Text>
                    <Text style={{ flex: 1.5, fontSize: 12, textAlign: 'center' }}>Rating</Text>
                    <Text style={{ flex: 0.3, fontSize: 12, textAlign: 'center' }}>Edit</Text>
                </View>

                <ScrollView>
                    {this.state.scorelist.map((item, index) => {
                        return (
                            <View key={index} disabled={this.state.isEditing} style={{
                                flexDirection: 'row',
                                backgroundColor: index % 2 == 0 ? 'white' : commonColors.background, alignItems: 'center',
                                paddingHorizontal: 15, height: 64
                            }}>
                                <View style={{ flex: 1 }}>
                                    <Image source={commonStyles.userEmptyIcon} style={{ height: 40, width: 40, borderRadius: 20 }} />
                                    <Text numberOfLines={1} style={{ fontSize: 12, overflow: 'hidden' }} >{item.name}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', flex: 0.7, alignItems: 'center' }}>
                                    {!item.isEditScore && <Text numberOfLines={1} style={{ flex: 1, fontSize: 12, textAlign: 'center' }}>{item.score}</Text>}
                                    {item.isEditScore && <TextInput
                                        placeholder="Type your name..."
                                        placeholderTextColor={commonColors.placeText}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        underlineColorAndroid="transparent"
                                        value={item.score}
                                        keyboardType="number-pad"
                                        onChangeText={score => this.changeScore(score, item, index)}
                                        style={{
                                            borderBottomColor: commonColors.placeText, borderBottomWidth: 0.5,
                                            height: 30, flex: 1, paddingHorizontal: 10
                                        }}
                                    />}

                                </View>
                                <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>

                                    <StarRatingBar
                                        dontShowScore={true}
                                        score={item.rating}
                                        spacing={5}
                                        readOnly={!item.isEditScore}
                                        // continuous={true}
                                        allowsHalfStars={true}
                                        accurateHalfStars={true}
                                        onStarValueChanged={rating => this.changeRating(rating, item, index)}

                                    />
                                    <Text style={{ fontSize: 12, marginLeft: 5, width: 20 }}>{item.rating.toFixed(1)}</Text>
                                </View>
                                <TouchableOpacity disabled={this.state.isEditing && !item.isEditScore}
                                    onPress={() => this.clickItem(item, index)}
                                    style={{ marginLeft: 10, alignItems: 'center', flex: 0.3 }}>
                                    {!item.isEditScore && <Ionicons name="md-create" size={20} color={this.state.isEditing ? commonColors.lightTheme : commonColors.theme} />}
                                    {item.isEditScore && <Ionicons name="ios-checkmark-circle" size={28} color={commonColors.theme} />}
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                </ScrollView>
                <TouchableOpacity style={{
                    position: 'absolute', bottom: 0, width: '100%', backgroundColor: commonColors.theme,
                    borderTopColor: '#ccc', borderTopWidth: 0.5, paddingVertical: 15, justifyContent: 'center', alignItems: 'center', height: 50
                }}>
                    <Text style={{ fontSize: 14, color: '#fff', flex: 1, marginLeft: 15 }}>
                        Submit</Text>

                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <View behavior="padding" style={styles.container}>
                {this.renderHeader()}
                {/* <View style={{ height: 60, flexDirection: 'row', justifyContent: 'center' }}>
                        <StarRatingBar
                            dontShowScore={true}
                            score={3.7}
                            starStyle={{
                                width: 20,
                                height: 20,
                            }}
                            spacing={5}
                            readOnly={false}
                            // continuous={true}
                            // allowsHalfStars={true}
                            // accurateHalfStars={true}
                        // onStarValueChanged={rating => this.changeRating(rating, item, index)}

                        />
                    </View> */}
                {this.renderBody()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: commonColors.background
    }
})