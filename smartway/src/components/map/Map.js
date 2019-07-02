import React, { Component, Fragment } from 'react'
import { Text, View, PermissionsAndroid, Button } from 'react-native'
import MapView,  { Marker } from 'react-native-maps'
import Search from './Search'
import Directions from './Directions'
import { speak } from '../../shared/utils';
import MapKit from './MapKit';
import Voice from './Voice'


const PERMISSIONS = [PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION];

export default class Map extends Component {
  static navigationOptions = {
    headerTransparent: true
  };

  constructor(props) {
    super(props);
    this.props = props;
    speak("Mapa conectado, insira a rota de destino")

    this.state = {
      region: null,
      destination: null,
      duration: null,
      location: null,
      latitudeOrigin: 0,
      longitudeOrigin: 0
    };
  }

  async componentDidMount() {
    this.getCurrentLocation();

  }

  getCurrentLocation() {
    PermissionsAndroid.requestMultiple(PERMISSIONS,)
      .then(granted => {
        navigator.geolocation.getCurrentPosition(
          position => {
            let region = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.534,
              longitudeDelta: 0.543
            }
            speak("Mapa conectado, insira a rota de destino")
            this.setState({region});
          },
          error => console.log(error.message),
          { enableHighAccuracy: true, timeout: 60000, maximumAge: 1000 }
        );
    }).catch(err => {
      reject(err);
    });
  }

  onMapLayout = () => {
    speak("Mapa conectado, insira a rota de destino")
  };

  render() {
    const { region } = this.state;
    const { navigate } = this.props.navigation;

    return (
      <MapKit
      region={region}
      showSearch={true}
      showsUserLocation={true}
      navigate={navigate}
      onLayout={this.onMapLayout}
      />
    )
  }
}
