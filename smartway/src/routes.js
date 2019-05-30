import React, {Component} from 'react';
import {createStackNavigator}  from 'react-navigation';

import Home from './components/home';
import QRCode from './components/qrcode/QRCode'
import CrosswalkDetection from './components/crosswalk/CrosswalkDetector';
import Favorites from './components/favorites/Favorites'
import Map from './components/map/Map'
import BusLine from './components/busLine/BusLine'

const RoutesNavigation = createStackNavigator({
    Home: Home,
    QRCode: QRCode,
    Crosswalk: CrosswalkDetection,
    Favorites: Favorites,
    Map: Map,
    BusLine: BusLine
});

export default class Routes extends Component {
    render() {
        return (
            <RoutesNavigation />
        );
    }
}
  