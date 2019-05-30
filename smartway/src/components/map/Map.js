import React, {Component} from 'react';
import { View, StyleSheet, PermissionsAndroid } from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

MapboxGL.setAccessToken('pk.eyJ1IjoicmVuYXRhZnNvdXphIiwiYSI6ImNqdzE4d3VxdzBqZmk0NW1tbDFoNTh3ZW4ifQ.p6LguU-I7gCBsLiGVKph7A');

export default class Map extends Component {

    state = {
      position: '',
      longitude: 0,
      latitude: 0
    }

    componentDidMount() {
      
      PermissionsAndroid.requestMultiple(
                  [PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                  PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION],
                ).then(granted => {
              
              navigator.geolocation.getCurrentPosition(
                position => {
                                    
                  this.setState(state => ({ latitude: position.coords.latitude }));
                  this.setState(state => ({ longitude: position.coords.longitude }));
                  
                },

                error => console.log(error.message),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
              );
          }).catch(err => {
              reject(err);
          });
      }
   
    
      render() {
        
        return (        
            <MapboxGL.MapView
            centerCoordinate={[this.state.longitude, this.state.latitude]}
            style={styles.container}
            showUserLocation={true}
            styleURL={MapboxGL.StyleURL.Dark}
          >
          </MapboxGL.MapView>
        );
      }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    annotationContainer: {
      width: 30,
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      borderRadius: 15,
    },
    annotationFill: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: '#7159C1',
      transform: [{ scale: 0.8 }],
    }
  });