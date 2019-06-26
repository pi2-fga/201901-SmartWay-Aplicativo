import React, { Component } from 'react';
import { Text, View, PermissionsAndroid } from 'react-native';
import MapKit from '../map/MapKit';
import { speak } from '../../shared/utils';

const PERMISSIONS = [PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION];

export default class FavoriteDirection extends Component {
    static navigationOptions = {
        headerTransparent: true
      };

      constructor(props) {
        super(props);
        this.props = props;
        speak("Mapa conectado!")
        this.state = {
            region: null,
            isMapReady: false,
        }    
      }

    async componentDidMount() {
        console.log("=========NAVIGATION========");
        console.log(this.props.navigation.getParam('destination'));

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
    this.setState({ isMapReady: true });
    };  

    render() {
        return (
            <MapKit  
            region={this.state.region} 
            destination={this.props.navigation.getParam('destination')}
            showsUserLocation={true}
            showSearch={false}
            onLayout={this.onMapLayout}
            />
        )
    }
}
