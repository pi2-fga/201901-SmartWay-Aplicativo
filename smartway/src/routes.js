import React, {Component} from 'react';
import {createStackNavigator, createAppContainer, createSwitchNavigator}  from 'react-navigation';

import Home from './components/home';
import QRCode from './components/qrcode/QRCode';
import Favorites from './components/favorites/Favorites'

const RoutesNavigation = createStackNavigator({
    Home: {
        screen: Home
    },
    QRCode: {
        screen: QRCode
    },

    Favorites: {
        screen: Favorites
    }

});

export default class Routes extends Component {
    render() {
        return (
            <RoutesNavigation />
        );
    }
}
  