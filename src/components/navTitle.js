import React, { PureComponent } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    Alert,
    Platform,
    Switch,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import IonIcon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types'

import { screenWidth } from '../styles/commonStyles';
import * as commonColors from '../styles/commonColors';
import * as commonStyles from '../styles/commonStyles';


export default class NavTitleBar extends PureComponent {

    static propTypes = {
        onBack: PropTypes.func,
        title: PropTypes.string,
        buttons: PropTypes.number,
    }

    static defaultProps = {
        title: '',
        rightText: '',
        buttons: commonStyles.NavNoneButton,
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillUnmount() {
    }

    onBack() {
        if (this.props.onBack) {
            this.props.onBack();
        }
    }

    get renderLeftButton() {
        const {
            buttons,
        } = this.props;

        if (buttons & commonStyles.NavBackButton) {
            return (
                <View style={styles.leftLayout}>
                    <TouchableOpacity activeOpacity={.5} onPress={() => this.onBack()}>
                        <IonIcon name="ios-arrow-round-back" size={40} color={commonColors.normalText} style={{ height: 34 }} />
                    </TouchableOpacity>
                </View>
            );
        }

        if (buttons & commonStyles.NavCloseButton) {
            return (
                <View style={styles.leftLayout}>
                    <TouchableOpacity activeOpacity={.5} onPress={() => this.onBack()}>
                        <IonIcon name="ios-close" size={40} color={commonColors.normalText} style={{ height: 34 }} />
                    </TouchableOpacity>
                </View>
            );
        }

        return (
            <View style={styles.leftLayout} />
        );
    }

    onRightClick() {
        if (this.props.rightCallback) {
            this.props.rightCallback()
        }
    }

    get renderRightButton() {
        const {
            buttons,
            rightText,
        } = this.props;
        if (buttons & commonStyles.NavMenuButton) {
            return (
                <View style={styles.rightLayout}>
                    <TouchableOpacity activeOpacity={.5} >
                        <View style={styles.button}>
                            <Image source={commonStyles.menuImg} style={styles.image} />
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }
        return (
            <View style={styles.rightLayout} >
                <TouchableOpacity disabled={this.props.rightCallback == null} onPress={() => this.onRightClick()}>
                    {this.props.rightCallback == null && <Text style={styles.rightTextDisable}>{rightText}</Text>}
                    {this.props.rightCallback != null && <Text style={styles.rightTextEnable}>{rightText}</Text>}
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        const {
            title,
        } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.navigationBarWrap}>
                    {this.renderLeftButton}
                    {title.length > 0 && <View style={styles.titleBarWrap}>
                        <Text style={styles.textTitle}>{title}</Text>
                    </View>}
                    {this.renderRightButton}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    leftLayout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 15,
    },
    rightLayout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 23,
    },
    rightTextDisable: {
        fontSize: 10,
        fontWeight: 'bold',
        color: commonColors.menuRight,
    },
    rightTextEnable: {
        fontSize: 10,
        fontWeight: 'bold',
        color: commonColors.theme,
    },
    textTitle: {
        color: commonColors.normalText,
        //fontFamily: 'openSans',
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
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

    container: {
        backgroundColor: 'transparent',
    },
    titleBarWrap: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleBarPadding: {
        flex: 1,
    },
    buttonWrap: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    button: {
    },
    image: {
        width: 30,
        height: 16,
    },
    textButton: {
        color: 'rgb(44,165,187)',
        fontSize: 12,
        textAlign: 'center',
    },

});