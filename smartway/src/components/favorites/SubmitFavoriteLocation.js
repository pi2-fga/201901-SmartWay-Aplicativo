import React, { Component } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, FlatList, ScrollView } from 'react-native';
import { speak } from '../../shared/utils';
import MapKit from '../map/MapKit';
import FormFavorites from './FormFavorites';

export default class SubmitFavoriteLocation extends Component {
    constructor(props) {
        super(props);
        const item = this.props.navigation.getParam('item');
        
        console.log("====FAVORITO SUBMIT==============")
        console.log(item)

        speak("Confirme o endereço de " + item.favorito.place);
        this.state = {
            place: "Home",
            destination: "UM DESTINO",
            isMapReady: false,
            region: {
                latitude: item.favorito.region.latitude,
                longitude: item.favorito.region.longitude,
                latitudeDelta: 0.12,
                longitudeDelta: 0.2
            },
            item,
        }
      }
      
      static navigationOptions = ({navigation}) => {
        const destination = navigation.getParam('destination');
        const placeTitle = navigation.getParam('place');
        const showSearch = navigation.getParam('showSearch');
        const item = navigation.getParam('item');
    
        
        return {
            headerTitle:<FormFavorites 
                        showSearch= {showSearch}
                        item={item} 
                        destination={item.favorito.region} 
                        place={placeTitle} 
                        navigation={navigation} />,
            headerStyle: {height: 170 }
        }
      };

      onMapLayout = () => {
        this.setState({ isMapReady: true });
      };

   

  render() {
    //const response = this.props.navigation.getParam('destination');
    const showSearch = this.props.navigation.getParam('showSearch');  
    const region = {
        latitude: this.state.item.favorito.region.latitude,
        longitude: this.state.item.favorito.region.longitude,
        latitudeDelta: 0.12,
        longitudeDelta: 0.2
    }
    // const destination = {
    //     latitude: response.latitude,
    //     longitude: response.longitude,
    //     title: response.title
    // }

    return (  
        <MapKit  
        region={this.state.region} 
        destination={this.state.item.favorito.region}
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