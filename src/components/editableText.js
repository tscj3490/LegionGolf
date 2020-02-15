import React, { PureComponent } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Platform,
} from 'react-native';

import IonIcons from 'react-native-vector-icons/Ionicons';

import { screenWidth } from '../styles/commonStyles';
import * as commonColors from '../styles/commonColors';
import * as commonStyles from '../styles/commonStyles';

export const EditButton = ({disabled, isEditing, onPress, style}) => (
    <TouchableOpacity
        disabled={disabled}
        onPress={() => onPress()}
        style={[styles.container, style]}>

        {!isEditing && <IonIcons name="md-create" size={24}
            color={disabled ? commonColors.lightTheme : commonColors.theme} />}

        {isEditing && <IonIcons name="md-checkmark-circle" size={24} color={commonColors.theme} />}

    </TouchableOpacity>
)

export const EditableText = ({isEditing, placeholder, value, onChangeText, inputStyle, textStyle, keyboardType})=>{
    if (isEditing) return (
        <TextInput
            placeholder={placeholder}
            placeholderTextColor={commonColors.placeText}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType={keyboardType}
            underlineColorAndroid="transparent"
            value={value}
            onChangeText={text => onChangeText(text)}
            style={[styles.textInput, inputStyle]}
        />
    )
    return (
        <Text style={[styles.text, textStyle]}>
            {value}
        </Text>
    )
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 10,
        alignItems: 'center'
    },
    textInput: {
        paddingHorizontal: 15,
        borderColor: commonColors.placeText,
        borderWidth: 1,
        height: 40,
        alignItems:'center'
    },
    text:{ 
        fontSize: 14, 
        // color: 'black', 
        // fontWeight: 'bold', 
        // flex: 1,
    }
});