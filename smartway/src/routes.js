import React, {Component} from 'react';
import {createStackNavigator, createAppContainer, createSwitchNavigator}  from 'react-navigation';

import Home from './components/home';
import QRCode from './components/qrcode/QRCode'

const RoutesNavigation = createStackNavigator({
    Home: {
        screen: Home
    },
    QRCode: {
        screen: QRCode
    }
});

export default class Routes extends Component {
    render() {
        return (
            <RoutesNavigation />
        );
    }
}
  