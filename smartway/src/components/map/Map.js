import React, {Component} from 'react';
import { View, StyleSheet, PermissionsAndroid, TouchableOpacity, Text, TextInput } from 'react-native';
import MapboxClient from 'mapbox';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
MapboxGL.setAccessToken('pk.eyJ1IjoicmVuYXRhZnNvdXphIiwiYSI6ImNqdzE4d3VxdzBqZmk0NW1tbDFoNTh3ZW4ifQ.p6LguU-I7gCBsLiGVKph7A');

export default class Map extends Component {

  constructor(props){
    super(props);
  }
 
    state = {
      mapBox: undefined,
      permissions: [PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION],
      
        longitudeOrigin: 0,
        latitudeOrigin:  0,
        key_access: 'pk.eyJ1IjoicmVuYXRhZnNvdXphIiwiYSI6ImNqdzE4d3VxdzBqZmk0NW1tbDFoNTh3ZW4ifQ.p6LguU-I7gCBsLiGVKph7A',
        origin: {
          longitude: -48.0444263,
          latitude:  -15.8339528
        },
        destination: {
        longitude: -48.0200086,
        latitude:  -15.8690873
      }
    } 

    componentDidMount () {
      PermissionsAndroid.requestMultiple(this.state.permissions)
        .then(granted => {
              navigator.geolocation.getCurrentPosition(
                position => {
                  this.setState(state => ({ latitudeOrigin: position.coords.latitude }));
                  this.setState(state => ({ longitudeOrigin: position.coords.longitude }));
                  this.setState(state => ({ mapBox: new MapboxClient(this.state.key_access)}));
                  this.fetchDirections();
                },
                error => console.log(error.message),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
              );
          }).catch(err => {
              reject(err);
          });
    }

    async fetchDirections(){
      const requestOptions = {
        profile: 'walking',
        geometry: 'polyline',
      };
    
      let res = null;
      try {
        //let origin = {longitude: this.state.longitudeOrigin, latitude: this.state.latitudeOrigin};
        res = await this.state.mapBox.getDirections([this.state.origin, this.state.destination], 
          requestOptions);
      } catch (e) {
        console.log(e);
      }
      console.log("RES")
      console.log(res)
      if (res !== null) {
        const directions = res.entity.routes[0];
        this.setState({ directions: directions });
      }

      console.log("Directions");
      console.log(this.state.directions);
    }
    
      render() {
        const directions = this.state.directions;
  
        if (!directions) {
          return null;
        }
        return ( 
          <MapboxGL.MapView
            centerCoordinate={[this.state.origin.longitude, this.state.origin.latitude]}
            style={styles.container}
            showUserLocation={true}
            styleURL={MapboxGL.StyleURL.Dark}
          >
            <MapboxGL.ShapeSource id='mapbox-directions-source' shape={this.state.directions.geometry}>
              <MapboxGL.LineLayer
                id='mapbox-directions-line'
                style={[styles.directionsLine, this.props.style]} />
            </MapboxGL.ShapeSource>
          </MapboxGL.MapView> 
        );
      }
}

const stylesMapBoxGl = MapboxGL.StyleSheet.create({
  directionsLine: {
    lineWidth: 4,
    lineCap: MapboxGL.LineCap.Round,
    lineJoin: MapboxGL.LineJoin.Round,
    color: "#FFF"
  },
});

const styles = StyleSheet.create({
  containerInput: {
    borderBottomColor: '#333',
    borderRadius: 20,
    borderWidth: 1,
    width: 300,
    fontSize: 20,
    alignItems:  'center',
  },
  
  inputText: { 
    width: 270, 
    height: 42,
    fontSize: 20,
    alignItems:  'center',
    fontFamily: 'Arial',
  
    borderBottomColor: '#333',
   // maxLength: 70,
   },



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
    },

    productButton: { 
      
  
      height: 42,
      borderRadius: 5,
      borderWidth: 2,
      borderColor: "#DA552F",
      backgroundColor: "transparent",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10
  },

  productButtonText: {
      fontSize: 16,
      color: "#DA552F",
      fontWeight: "bold"
  }
  });