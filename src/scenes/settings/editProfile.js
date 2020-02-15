
import React, { PureComponent } from 'react'

import {
    StyleSheet,
    View,
    Text,
    Platform,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Image,
    TextInput,
    Switch,
    Modal,
} from 'react-native'

import { Actions } from 'react-native-router-flux'
import IonIcons from 'react-native-vector-icons/Ionicons' 
import MapView, { Marker } from 'react-native-maps'

import DatePicker from 'react-native-datepicker'

import * as commonColors from '../../styles/commonColors'
import * as commonStyles from '../../styles/commonStyles'

const height = (Platform.OS === 'ios') ? 70 : 50



export default class EditProfile extends PureComponent {
    constructor(props) {
        super(props)

        this.state = props.data;

        if (this.state.handicap == null) this.state.handicapText=''
        else this.state.handicapText = this.state.handicap.toString()

        if (this.state.age == null) this.state.ageText=''
        else this.state.ageText = this.state.age.toString()
    }

    updateProfile() {

        this.state.handicap = Number(this.state.handicapText)
        this.state.age = Number(this.state.ageText)
        this.props.onUpdate(this.state)
        Actions.pop()
    }

    renderAboutEdit() {
        return (
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                {/* <View style={{
                    width: '100%', height: height, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center',
                    paddingTop: 20
                }}>
                    <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>Edit</Text>
                    <TouchableOpacity style={{ position: 'absolute', left: 15, top: 35 }} onPress={this.Back}>
                        <Text style={{ color: 'white', fontSize: 14 }}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ position: 'absolute', right: 15, top: 35 }} onPress={this.Back}>
                        <IonIcons name="md-checkmark" size={20} color={'white'} />
                    </TouchableOpacity>
                </View> */}
                <ScrollView style={styles.container}>
                    <View style={{ padding: 15, backgroundColor: '#fff' }}>
                        <Text style={{ fontSize: 12, color: commonColors.normalText }}>About Me</Text>
                        <TextInput
                            placeholder=""
                            editable={true}
                            multiline={true}
                            placeholderTextColor={commonColors.placeText}
                            underlineColorAndroid="transparent"
                            value={this.state.about}
                            onChangeText={(text) => this.setState({ about: text })}
                            style={{
                                paddingHorizontal: 15,
                                borderColor: commonColors.placeText, borderWidth: 1,
                                height: 200, marginTop: 10,
                            }}
                        />
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{
                    width: '100%', height: height, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center',
                    paddingTop: Platform.OS === 'ios' ? 20 : 0, borderBottomColor: '#ccc', borderBottomWidth: 0.5,
                }}>
                    <TouchableOpacity style={{ position: 'absolute', left: 15, top: 26 }} onPress={() => Actions.pop()}>
                        <IonIcons name="ios-arrow-round-back" color={'#333'} size={40} style={{ height: 30 }} />
                    </TouchableOpacity>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>Edit Profile</Text>
                    </View>
                    <TouchableOpacity style={{ position: 'absolute', right: 15, top: 30 }}
                        onPress={() => this.updateProfile()}>
                        <IonIcons name="ios-checkmark-circle" color={commonColors.theme} size={26} />
                    </TouchableOpacity>
                </View>
                <ScrollView>

                    <View style={{ backgroundColor: 'white', paddingBottom: 20 }}>
                        <View style={{ paddingHorizontal: 15, marginTop: 30 }}>
                            <Text style={{ fontSize: 12, color: commonColors.normalText }}>Fullname</Text>
                            <TextInput
                                placeholder="Fullname"
                                placeholderTextColor={commonColors.placeText}
                                autoCapitalize="none"
                                autoCorrect={false}
                                underlineColorAndroid="transparent"
                                value={this.state.fullName}
                                style={{
                                    paddingHorizontal: 15,
                                    borderColor: commonColors.placeText, borderWidth: 1,
                                    height: 40, marginTop: 8,
                                }}
                                onChangeText={(text) => this.setState({ fullName: text })}
                            />
                        </View>

                        {/* <View style={{ paddingHorizontal: 15, marginTop: 15 }}>
                            <Text style={{ fontSize: 12, color: commonColors.normalText }}>Email</Text>
                            <View style={{ marginTop: 8, flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput
                                    placeholder="Email"
                                    placeholderTextColor={commonColors.placeText}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    underlineColorAndroid="transparent"
                                    value={this.state.email}
                                    style={{
                                        paddingHorizontal: 15,
                                        borderColor: commonColors.placeText, borderWidth: 1,
                                        height: 40, flex: 1,
                                    }}
                                    onChangeText={(text) => { this.setState({ email: text }) }}
                                />

                            </View>
                        </View> */}

                        <View style={{ paddingHorizontal: 15, marginTop: 30, alignItems: 'center', flexDirection: 'row' }}>
                            <TouchableOpacity style={{ marginLeft: 0 }} onPress={() => this.setState({ gender: 'M' })}>
                                {this.state.gender == 'M' && <IonIcons name="md-radio-button-on" color={commonColors.theme} size={16} />}
                                {this.state.gender == 'F' && <IonIcons name="md-radio-button-off" color={commonColors.theme} size={16} />}
                            </TouchableOpacity>
                            <Text style={{ fontSize: 12, color: commonColors.normalText, marginLeft: 10 }}>Male</Text>

                            <TouchableOpacity style={{ marginLeft: 50 }} onPress={() => this.setState({ gender: 'F' })}>
                                {this.state.gender == 'F' && <IonIcons name="md-radio-button-on" color={commonColors.theme} size={16} />}
                                {this.state.gender == 'M' && <IonIcons name="md-radio-button-off" color={commonColors.theme} size={16} />}
                            </TouchableOpacity>
                            <Text style={{ fontSize: 12, color: commonColors.normalText, marginLeft: 10 }}>Female</Text>
                        </View>

                        <View style={{ paddingHorizontal: 15, marginTop: 15 }}>
                            <Text style={{ fontSize: 12, color: commonColors.normalText }}>Handicap</Text>
                            <View style={{ marginTop: 8, flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput
                                    placeholder="Handicap"
                                    placeholderTextColor={commonColors.placeText}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    keyboardType="number-pad"
                                    underlineColorAndroid="transparent"
                                    value={this.state.handicapText}
                                    style={{
                                        paddingHorizontal: 15,
                                        borderColor: commonColors.placeText, borderWidth: 1,
                                        height: 40, flex: 1,
                                    }}
                                    onChangeText={(text) => { this.setState({ handicapText: text }) }}
                                />

                            </View>
                        </View>
                        <View style={{ paddingHorizontal: 15, marginTop: 15 }}>
                            <Text style={{ fontSize: 12, color: commonColors.normalText }}>Location</Text>
                            <View style={{ marginTop: 8, flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput
                                    placeholder="Location"
                                    placeholderTextColor={commonColors.placeText}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    underlineColorAndroid="transparent"
                                    value={this.state.location}
                                    style={{
                                        paddingHorizontal: 15,
                                        borderColor: commonColors.placeText, borderWidth: 1,
                                        height: 40, flex: 1,
                                    }}
                                    onChangeText={(text) => { this.setState({ location: text }) }}
                                />

                            </View>
                        </View>
                        <View style={{ paddingHorizontal: 15, marginTop: 15 }}>
                            <Text style={{ fontSize: 12, color: commonColors.normalText }}>Age</Text>
                            <View style={{ marginTop: 8, flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput
                                    placeholder="Age"
                                    placeholderTextColor={commonColors.placeText}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    underlineColorAndroid="transparent"
                                    keyboardType="number-pad"
                                    value={this.state.ageText}
                                    style={{
                                        paddingHorizontal: 15,
                                        borderColor: commonColors.placeText, borderWidth: 1,
                                        height: 40, flex: 1,
                                    }}
                                    onChangeText={(text) => { this.setState({ ageText: text }) }}
                                />

                            </View>
                        </View>
                        {this.renderAboutEdit()}
                    </View>

                </ScrollView>
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