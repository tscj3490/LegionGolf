
import React, { PureComponent } from 'react'

import {
    StyleSheet,
    View,
    Text,
    Platform,
    TouchableOpacity,
    ScrollView,
    Image,
    ActivityIndicator,
    Modal,
    TextInput,
    Alert,
} from 'react-native'

import { Actions } from 'react-native-router-flux'
import Ionicons from 'react-native-vector-icons/Ionicons';
import StarRatingBar from 'react-native-star-rating-view/StarRatingBar'

import * as commonColors from '../../styles/commonColors'
import * as commonStyles from '../../styles/commonStyles'
import Cache from '../../utils/cache'
import Api from '../../services/Api'
import * as config from '../../config'

import ImagePicker from 'react-native-image-picker'
import ImageCropPicker from 'react-native-image-crop-picker'
import ImageResizer from 'react-native-image-resizer'

const height = (Platform.OS === 'ios') ? 70 : 50


import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'

const updateProfileQl = gql`
    mutation ($keybaseid:String!, $gender: String!, $fullName: String!, $location: String!, $handicap: Int!, $age: Int!, $about: String!, $imageUrl: String!){
        updateUserByKeybaseid(input: {keybaseid: $keybaseid, userPatch: {
            gender: $gender,
            fullName: $fullName,
            location: $location
            about: $about,
            handicap: $handicap,
            age: $age
            imageUrl: $imageUrl
        }}) {
            user {
                keybaseid
                location
                rating
                fullName
                gender
                handicap
                about
                imageUrl
                age
            }
        }
    }
`

class Profile extends PureComponent {
    constructor(props) {
        super(props)

        let {keybaseid, rating, fullName, location, gender, handicap, about, imageUrl, age} = Cache.currentUser
        this.state = {
            keybaseid ,
            fullName,
            location,
            gender,
            handicap,
            age,
            about,
            rating,
            avatar: imageUrl==null?commonStyles.userEmptyIcon:{uri:imageUrl},

            header: 'Welcome to my leagiongolf app!',
            isEditing: false,
            isWaiting: false

        }
    }

    openPicker() {
        let options = {
            quality: 0.8,
            storateOptions: {
                skipBackup: true,
            }
        }
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('cancel')
            } else if (response.error) {
                console.log('error')
            } else {
                let source = { uri: response.uri }
                ImageCropPicker.openCropper({
                    cropping: true,
                    path: response.uri,
                    width: this.state.width,
                    height: this.state.height,
                    borderRadius: 200,
                    cropperCircleOverlay: true,
                }).then(image => {
                    // ImageResizer.createResizedImage(image.path, this.state.imageWidth, this.state.imageHeight, 'JPEG', 100)
                    //     .then(({ uri }) => {

                    //     }).catch((err) => {
                    //         console.log(err)
                    //     })
                    console.log(image.path)
                    this.image = image
                    this.setState({ avatar: { uri: image.path } })
                })
            }
        })
    }

    onUpdate(data) {
        this.setState({ ...data })
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

    done(){
        this.setState({ isWaiting: true })
        if ( this.image != undefined ){            
            Api.uploadFile(this.image.path, (err, res)=>{
                
                if ( err == null ){
                    this.props.client.mutate({
                        mutation: updateProfileQl,
                        variables: {
                            keybaseid: Cache.currentUser.keybaseid,
                            location: this.state.location,
                            rating: this.state.rating,
                            gender: this.state.gender,
                            fullName: this.state.fullName,
                            about: this.state.about,
                            handicap: this.state.handicap,
                            age: this.state.age,
                            imageUrl: config.image_path+res.filename
                        }
                    }).then((res)=>{
                        this.setState({ isWaiting: false })
                        Cache.currentUser = res.data.updateUserByKeybaseid.user
                        Actions.pop()
                    })
                }
            })
            return;
        }
        this.props.client.mutate({
            mutation: updateProfileQl,
            variables: {
                keybaseid: Cache.currentUser.keybaseid,
                location: this.state.location,
                rating: this.state.rating,
                gender: this.state.gender,
                fullName: this.state.fullName,
                about: this.state.about,
                handicap: this.state.handicap,
                age: this.state.age,
                imageUrl: Cache.currentUser.imageUrl
            }
        }).then((res)=>{
            this.setState({ isWaiting: false })
            Cache.currentUser = res.data.updateUserByKeybaseid.user
            Actions.pop()
        })
    }

    renderHeader() {
        return (
            <View style={{ padding: 15, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }} >

                    <View>
                        <Image source={this.state.avatar} style={{ height: 120, width: 120, borderRadius: 60 }} />
                        <TouchableOpacity onPress={() => this.openPicker()} style={{
                            position: 'absolute', right: 0, bottom: 0, backgroundColor: '#999',
                            height: 30, width: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center'
                        }}>
                            <Ionicons name="ios-camera" size={20} color={'white'} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    renderNavTitle() {
        return (
            <View style={{
                width: '100%', height: height, backgroundColor: commonColors.theme, justifyContent: 'center', alignItems: 'center',
                paddingTop: Platform.OS === 'ios' ? 20 : 0
            }}>
                <TouchableOpacity style={{ position: 'absolute', left: 15, top: 30 }} onPress={() => Actions.pop()}>
                    <Ionicons name="ios-arrow-back" color={'white'} size={30} />
                </TouchableOpacity>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Profile</Text>
                </View>
                <TouchableOpacity style={{ position: 'absolute', right: 15, top: 35 }} onPress={() => this.done()}>
                    <Ionicons name="md-checkmark" size={20} color={'white'} />
                </TouchableOpacity>
            </View>
        )
    }

    renderAboutMe() {
        return (
            <View style={{ backgroundColor: 'white', padding: 15 }}>
                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                    <Text style={{ fontSize: 14, color: 'black', fontWeight: 'bold' }}>About Me</Text>
                    <View style={{ marginLeft: 50,
                        height: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
                    }}>
                        <StarRatingBar
                            dontShowScore={true}
                            score={Number(this.state.rating)}
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
                        <Text style={{ fontSize: 12, marginLeft: 5, width: 20 }}>{this.state.rating}</Text>
                    </View>
                    <View style={{ flex: 1 }} />
                    <TouchableOpacity
                        onPress={() => Actions.EditProfile({ data: this.state, onUpdate: (data) => this.onUpdate(data) })}
                        style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Ionicons name="md-create" size={20} color={this.state.isEditing ? commonColors.lightTheme : commonColors.theme} />
                    </TouchableOpacity>
                </View>
                {/* <Text style={{ fontSize: 14, color: '#333', marginTop: 10 }}>{this.state.header}</Text> */}
                <Text style={{ fontSize: 14, color: '#333', marginTop: 20 }}>{this.state.about}</Text>
                <View style={{ alignItems: 'center', marginTop: 15 }}>
                    <TouchableOpacity>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: commonColors.theme }}>More</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    renderMainInfo() {
        return (
            <View style={{ padding: 15, flex: 1, backgroundColor: 'white', marginTop: 5 }}>
            {this.renderIndicator()}
                <View style={{ flexDirection: 'row', width: '100%', paddingVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 13, color: '#333', flex: 1 }}>Keybase ID</Text>
                    <Text style={{ fontSize: 15, color: '#333', flex: 2 }}>{this.state.keybaseid}</Text>
                </View>
                <View style={{ flexDirection: 'row', width: '100%', paddingVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 13, color: '#333', flex: 1 }}>Full name</Text>
                    <Text style={{ fontSize: 15, color: '#333', flex: 2 }}>{this.state.fullName}</Text>

                </View>
                {/* <View style={{ flexDirection: 'row', width: '100%', paddingVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 13, color: '#333', flex: 1 }}>Email</Text>
                    <Text style={{ fontSize: 15, color: '#333', flex: 2 }}>{this.state.email}</Text>
                </View> */}

                <View style={{ flexDirection: 'row', width: '100%', paddingVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 13, color: '#333', flex: 1 }}>Gender</Text>
                    <Text style={{ fontSize: 15, color: '#333', flex: 2 }}>{this.state.gender=='M' ? 'Male' : 'Female'}</Text>
                </View>

                <View style={{ flexDirection: 'row', width: '100%', paddingVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 13, color: '#333', flex: 1 }}>Handicap</Text>
                    <Text style={{ fontSize: 15, color: '#333', flex: 2 }}>{this.state.handicap}</Text>
                </View>

                <View style={{ flexDirection: 'row', width: '100%', paddingVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 13, color: '#333', flex: 1 }}>Location</Text>
                    <Text style={{ fontSize: 15, color: '#333', flex: 2 }}>{this.state.location}</Text>
                </View>

                <View style={{ flexDirection: 'row', width: '100%', paddingVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 13, color: '#333', flex: 1 }}>Age</Text>
                    <Text style={{ fontSize: 15, color: '#333', flex: 2 }}>{this.state.age}</Text>
                </View>
            </View>

        )
    }

    signout() {
        Alert.alert(
            '',
            'Do you want to sign out?',
            [
                { text: 'Cancel', onPress: () => { }, style: 'cancel' },
                { text: 'OK', onPress: () => { Actions.Introduce() } },
            ],
            { cancelable: false }
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderNavTitle()}
                <ScrollView>
                    {this.renderHeader()}
                    {this.renderAboutMe()}
                    {this.renderMainInfo()}

                    <View style={{ padding: 40, flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <TouchableOpacity disabled={this.state.isEditing} onPress={() => Actions.ChangePassword()} style={{
                            borderWidth: 1, borderColor: this.state.isEditing ? commonColors.lightTheme : commonColors.theme,
                            height: 44, justifyContent: 'center', alignItems: 'center', width: '100%'
                        }}>
                            <Text style={{ fontSize: 13, color: this.state.isEditing ? commonColors.lightTheme : commonColors.theme }}>Change Password</Text>
                        </TouchableOpacity>

                        <TouchableOpacity disabled={this.state.isEditing} onPress={() => this.signout()} style={{ marginTop: 30 }}>
                            <Text style={{ fontSize: 13, color: this.state.isEditing ? commonColors.lightTheme : commonColors.theme }}>Sign Out</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default withApollo(Profile)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: commonColors.background
    }
})