import React, { Component } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, FlatList, ScrollView } from 'react-native';
import Search from '../map/Search';
import { speak } from '../../shared/utils';

export default class AddFavoriteLocation extends Component {
  static navigationOptions = {
      headerTitle: "Adicionar endereço"
  };

  constructor(props) {
    super(props);
    speak("Qual o endereço?");
    this.state = {
      region: null, 
      destination: null,
      duration: null,
      location: null,
      latitudeOrigin: 0,
      longitudeOrigin: 0,      
    };
  }
 

  handleLocationSelected = (data, { geometry }) => {
    const {
   location: { lat: latitude, lng: longitude }} = geometry; //Desestruturacao do JavaScript. Só usa o que importa do objeto

   
    let destination = {
        latitude: latitude,
        longitude: longitude,
        title: data.structured_formatting.main_text
    }

    let placeTitle = this.props.navigation.getParam('place');
   
    if(placeTitle == "other") {
        placeTitle = destination.title;
    }

    this.props.navigation.navigate('SubmitFavoriteLocation', {destination: destination, place: placeTitle});
  };


  render() {
    const show = this.state.isSubmitted;
    const { navigation } = this.props;

    return (
    <View style={styles.container}>
            <Search 
            textPlaceholder={"Qual o endereço?"}
            onLocationSelected={this.handleLocationSelected}
            />
  
    </View>  
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column', 
        backgroundColor: '#fff',        
    },   
    
})
