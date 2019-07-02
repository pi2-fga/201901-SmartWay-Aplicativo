import React, {Component} from 'react';
import {createStackNavigator}  from 'react-navigation';

import Home from './components/home';
import QRCode from './components/qrcode/QRCode'
import CrosswalkDetection from './components/crosswalk/CrosswalkDetector';
import MenuFavorites from './components/favorites/MenuFavorites';
import Map from './components/map/Map';
import BusLine from './components/busLine/BusLine';
import FavoritesBusLines from './components/favorites/FavoritesBus';
import SearchFavoriteLocation from './components/favorites/SearchFavoriteLocation';
import SubmitFavoriteLocation from './components/favorites/SubmitFavoriteLocation';
import FavoriteDirection from './components/favorites/FavoriteDirection';
import Voice from './components/map/Voice';

const RoutesNavigation = createStackNavigator({
    Home: Home,
    QRCode: QRCode,
    Crosswalk: CrosswalkDetection,
    MenuFavorites: MenuFavorites,
    Map: Map,
    BusLine: BusLine,
    FavoritesBusLines: FavoritesBusLines,
    SearchFavoriteLocation: SearchFavoriteLocation,
    SubmitFavoriteLocation: SubmitFavoriteLocation,
    FavoriteDirection: FavoriteDirection
    Voice: Voice
});

export default class Routes extends Component {
    render() {
        return (
            <RoutesNavigation />
        );
    }
}
