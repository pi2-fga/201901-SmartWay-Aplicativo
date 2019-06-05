import React, {Component} from 'react';
import { View, StyleSheet, PermissionsAndroid, TouchableOpacity, Text, TextInput } from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

MapboxGL.setAccessToken('pk.eyJ1IjoicmVuYXRhZnNvdXphIiwiYSI6ImNqdzE4d3VxdzBqZmk0NW1tbDFoNTh3ZW4ifQ.p6LguU-I7gCBsLiGVKph7A');

class LogoTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Para onde??                                ' };
  }

  render() {
    return (
      <View style={ styles.containerInput}>

      <TextInput
      style={styles.inputText}
      onChangeText={(text) => this.setState({text})}
      value={this.state.text}
      editable={true}
      maxLength={50}
      />

      </View>
    );
  }
}



export default class Map extends Component {
  static navigationOptions = {
    // headerTitle instead of title
    headerTitle: <LogoTitle />,
  };
    state = {
      region: {
      longitude: 0,
      latitude: 0
      },
      position: '',
      longitude: 0,
      latitude: 0,
      text: 'Useless Placeholder'
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
      flexDirection: 'column',
      backgroundColor: '#fff',
  },
    map: {
      zIndex: 2,
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
