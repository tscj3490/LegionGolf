import React, { PureComponent } from 'react';
import {
    Platform,
} from 'react-native';

import { Actions, ActionConst, Scene, Router } from 'react-native-router-flux';

import Introduce from './scenes/introduce'
import Main from './scenes/main'


import Login from './scenes/auth/login'
import Register from './scenes/auth/register'
import Forgot from './scenes/auth/forgot'

import Home from './scenes/home/home'
import AddGame from './scenes/home/addGame'
import AddMembers from './scenes/home/addMember'
import InviteMembers from './scenes/home/inviteMembers'
import GameDetail from './scenes/home/gameDetail'
import Score from './scenes/home/score'
import MyScore from './scenes/home/myScore'
import Players from './scenes/players/players'
import PlayerDetail from './scenes/players/playerDetail'
import WinGameList from './scenes/players/winGameList' 
import Chat from './scenes/chat/chat'
import ChatView from './scenes/chat/chatView'
import Setting from './scenes/settings/setting'
import MyGameList from './scenes/settings/myGameList'
import MyBalance from './scenes/settings/myBalance'
import CameraView from './scenes/settings/cameraView'
import EditProfile from './scenes/settings/editProfile'
import ImagePicker from './scenes/settings/imagePicker'
import PastTransactions from './scenes/settings/pastTransactions'
import Profile from './scenes/settings/profile'
import ChangePassword from './scenes/settings/changePassword'
import Transfer from './scenes/settings/transfer'

export default class App extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const scenes = Actions.create(
            <Scene key="root">
                <Scene key="Introduce" component={Introduce} type={ActionConst.RESET} hideNavBar />
                <Scene key="Main" component={Main} hideNavBar />
                <Scene key="Score" component={Score} hideNavBar />
                <Scene key="MyScore" component={MyScore} hideNavBar />

                {/* Auth */}
                <Scene key="Login" component={Login} hideNavBar />
                <Scene key="Register" component={Register} hideNavBar />
                <Scene key="Forgot" component={Forgot} hideNavBar />

                {/* Home */}
                <Scene key="Home" component={Home} hideNavBar/>
                <Scene key="GameDetail" component={GameDetail} hideNavBar/>
                <Scene key="AddGame" component={AddGame} hideNavBar/>                
                <Scene key="AddMembers" component={AddMembers} hideNavBar/>
                <Scene key="InviteMembers" component={InviteMembers} hideNavBar/>

                {/* Search */}
                <Scene key="Players" component={Players} hideNavBar />
                <Scene key="PlayerDetail" component={PlayerDetail} hideNavBar />
                <Scene key="WinGameList" component={WinGameList} hideNavBar />

                {/* History */}
                <Scene key="Chat" component={Chat} hideNavBar />
                <Scene key="ChatView" component={ChatView} hideNavBar />

                {/* Setting */}
                <Scene key="Setting" component={Setting} hideNavBar />
                <Scene key="MyGameList" component={MyGameList} hideNavBar />
                <Scene key="MyBalance" component={MyBalance} hideNavBar />
                <Scene key="CameraView" component={CameraView} hideNavBar />
                <Scene key="EditProfile" component={EditProfile} hideNavBar />
                <Scene key="ImagePicker" component={ImagePicker} hideNavBar />
                <Scene key="PastTransactions" component={PastTransactions} hideNavBar />
                <Scene key="Profile" component={Profile} hideNavBar />
                <Scene key="ChangePassword" component={ChangePassword} hideNavBar />
                <Scene key="Transfer" component={Transfer} hideNavBar />
            </Scene>
        )

        return (
            <Router hideNavBar scenes={scenes} />
        );
    }
}
