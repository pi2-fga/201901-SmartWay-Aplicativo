import React, {Component} from 'react';
import {createStackNavigator, createAppContainer, createSwitchNavigator}  from 'react-navigation';

import Home from './components/home';
import QRCode from './components/qrcode/QRCode'
import CrosswalkDetection from './components/crosswalk/CrosswalkDetector';
import Favorites from './components/favorites/Favorites'

const RoutesNavigation = createStackNavigator({
    Home: Home,
    QRCode: QRCode,
    Crosswalk: CrosswalkDetection,
    Favorites: Favorites
});

export default class Routes extends Component {
    render() {
        return (
            <RoutesNavigation />
        );
    }
}
  