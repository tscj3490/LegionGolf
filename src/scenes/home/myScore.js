
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
    Alert,
} from 'react-native'


import { Actions } from 'react-native-router-flux'
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as commonColors from '../../styles/commonColors'
import * as commonStyles from '../../styles/commonStyles'
import StarRatingBar from 'react-native-star-rating-view/StarRatingBar'

import { EditButton, EditableText } from '../../components/editableText'

const height = 70

export default class MyScore extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            scorelist: [],
            isEditScore: false,
            isEditing: false,
            addedScoreVal: '',
            countOfItems: 0,
        }

        for (var i = 0; i < 18; i++) {
            this.state.scorelist.push({ score: 0 })
        }
    }

    AddScore() {

        const { addedScoreVal } = this.state;
        if ( addedScoreVal == '' ) return;
        this.state.scorelist[this.state.countOfItems].score = addedScoreVal
        setTimeout(() =>
            this.setState({ scorelist: [...this.state.scorelist], countOfItems: this.state.countOfItems + 1, addedScoreVal: '' }), 10)

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
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Input Your Score</Text>
                </View>
                {/* <TouchableOpacity style={{ position: 'absolute', right: 15, top: 35 }} onPress={() => Actions.pop()}>
                    <Ionicons name="md-checkmark" size={20} color={'white'} />
                </TouchableOpacity> */}
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

    renderTop() {
        return (
            <View style={{
                flexDirection: 'row', backgroundColor: '#fff', alignItems: 'center', height: 60,
                paddingHorizontal: 15
            }}>

                <TextInput
                    placeholder="Enter your score for every hole..."
                    placeholderTextColor={commonColors.placeText}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={this.state.addedScoreVal}
                    keyboardType="number-pad"
                    onChangeText={addedScoreVal => this.setState({ addedScoreVal })}
                    underlineColorAndroid="transparent"
                    style={{
                        paddingHorizontal: 20,
                        borderColor: '#ccc', borderWidth: 1,
                        height: 40, flex: 1, borderRadius: 30,
                    }}
                />

                <TouchableOpacity onPress={() => this.AddScore()} style={{
                    borderWidth: 1, borderColor: commonColors.theme, marginLeft: 10,
                    height: 28, justifyContent: 'center', alignItems: 'center', width: 70, borderRadius: 30,
                }}>
                    <Text style={{ fontSize: 12, color: commonColors.theme }}>Add</Text>
                </TouchableOpacity>

            </View>
        )
    }

    renderBody() {
        return (
            <View style={{}}>

                <View style={{ flexDirection: 'row', backgroundColor: '#ddd', alignItems: 'center', paddingHorizontal: 15, height: 44 }}>

                    <Text style={{ fontSize: 12 }} >No</Text>
                    <Text style={{ flex: 1, fontSize: 12, alignItems: 'center', textAlign: 'center' }}>Score</Text>
                    <Text style={{ fontSize: 12, textAlign: 'center' }}>Edit</Text>
                </View>
                <ScrollView>
                    {this.state.scorelist.map((item, index) => {
                        return (
                            <View key={index} style={{
                                flexDirection: 'row', backgroundColor: index % 2 == 0 ? 'white' : commonColors.background, alignItems: 'center',
                                paddingHorizontal: 15, height: 44
                            }}>
                                {this.state.countOfItems > index && <Text numberOfLines={1} style={{ fontSize: 12, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }} >{index + 1}</Text>}
                                {this.state.countOfItems > index && <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',marginLeft: 20 }}>
                                    <EditableText
                                        isEditing={item.isEditing}
                                        placeholder="input score..."
                                        value={item.score.toString()}
                                        keyboardType="number-pad"
                                        onChangeText={score => {
                                            item.score = Number(score)
                                            this.setState({ scorelist: [...this.state.scorelist] })
                                        }}
                                        inputStyle={{ color: '#333', borderWidth: 0, borderBottomWidth: 1, marginLeft: 20 }}
                                    />
                                </View>}
                                {this.state.countOfItems > index && <EditButton
                                    disabled={this.state.isEditing && !item.isEditing}
                                    isEditing={item.isEditing}
                                    onPress={() => {
                                        item.isEditing = !item.isEditing
                                        this.setState({ isEditing: !this.state.isEditing, scorelist: [...this.state.scorelist] })
                                    }}
                                />}

                            </View>
                        )
                    })}
                </ScrollView>
            </View>
        )
    }

    render() {
        return (
            <View behavior="padding" style={styles.container} >
                {this.renderHeader()}
                {this.renderTop()}
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