import React, {Component} from 'react';
import {createStackNavigator, createAppContainer, createSwitchNavigator}  from 'react-navigation';

import Home from './components/home';
import QRCode from './components/qrcode/QRCode';
import Favorites from './components/favorites/Favorites';
import Map from './components/map/Map';

const RoutesNavigation = createStackNavigator({
    Home: {
        screen: Home
    },
    QRCode: {
        screen: QRCode
    },

    Favorites: {
        screen: Favorites
    },

    Map: {
        screen: Map
    }

});

export default class Routes extends Component {
    render() {
        return (
            <RoutesNavigation />
        );
    }
}
  