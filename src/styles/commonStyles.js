import {
    StyleSheet,
    Dimensions,
    Platform,
  } from 'react-native';
  
  export const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  export const headerHeight = 80;
  export const menuHeight = 60;
  export const viewHeight = screenHeight - headerHeight - menuHeight;


  export const NavNoneButton              = 0;
  export const NavBackButton              = 1;
  export const NavFilterButton            = 2;
  export const NavOfflineButton           = 4;
  export const NavCloseButton             = 8;
  export const NavCloseTextButton         = 16;
  export const NavMenuButton              = 32;
  export const NavNotificationButton      = 64;
  export const NavPinButton               = 128;
  
  export const intro = require('../../public/images/intro.jpg')
  export const userEmptyIcon = require('../../public/images/empty_user.png')
  export const logo = require('../../public/images/logo.png')