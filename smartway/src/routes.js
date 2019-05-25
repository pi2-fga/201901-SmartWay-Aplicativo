import React, {Component} from 'react';
import {createStackNavigator, createAppContainer, createSwitchNavigator}  from 'react-navigation';

import Home from './components/home';
import QRCode from './components/qrcode/QRCode'
import CrosswalkDetection from './components/crosswalk/CrosswalkDetector';

const RoutesNavigation = createStackNavigator({
    Home: Home,
    QRCode: QRCode,
    Crosswalk: CrosswalkDetection
});

export default class Routes extends Component {
    render() {
        return (
            <RoutesNavigation />
        );
    }
}
  