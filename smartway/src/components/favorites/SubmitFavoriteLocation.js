import React, { Component } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, FlatList, ScrollView } from 'react-native';
import { speak } from '../../shared/utils';
import MapKit from '../map/MapKit';
import FormFavorites from './FormFavorites';

export default class SubmitFavoriteLocation extends Component {
    constructor(props) {
        super(props);
        speak("Confirme o endereço");
        this.state = {
            place: "Home",
            destination: "UM DESTINO",
            isMapReady: false,
        }
      }
      
      static navigationOptions = ({navigation}) => {
        const destination = navigation.getParam('destination');
        const placeTitle = navigation.getParam('place');
        const showSearch = navigation.getParam('showSearch');
        
        return {
            headerTitle:<FormFavorites 
                        showSearch= {showSearch} 
                        destination={destination} 
                        place={placeTitle} 
                        navigation={navigation} />,
            headerStyle: {height: 170 }
        }
      };

      onMapLayout = () => {
        this.setState({ isMapReady: true });
      };

   

  render() {
    const response = this.props.navigation.getParam('destination');
    const showSearch = this.props.navigation.getParam('showSearch');  
    const region = {
        latitude: response.latitude,
        longitude: response.longitude,
        latitudeDelta: 0.12,
        longitudeDelta: 0.2
    }
    const destination = {
        latitude: response.latitude,
        longitude: response.longitude,
        title: response.title
    }

    return (  
        <MapKit  
        region={region} 
        destination={destination}
        showsUserLocation={false}
        showSearch={showSearch == true? true : false}
        onLayout={this.onMapLayout}    
        />
    );
  }
}

const styles = StyleSheet.create({
    headerStyle: {
        height:60        
    },
})    