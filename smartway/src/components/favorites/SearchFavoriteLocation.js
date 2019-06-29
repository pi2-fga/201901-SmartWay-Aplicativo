import React, { Component } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, FlatList, ScrollView } from 'react-native';
import Search from '../map/Search';
import { speak } from '../../shared/utils';

/*TODO: Add descrição do endereço do local mesmo. 
    Descrição:
    Endereço:  
TODO: Verificar speak no didMount
*/


export default class SearchFavoriteLocation extends Component {
  static navigationOptions = ({navigation}) => {
      const edit = navigation.getParam('edit');
      
      return {
          headerTitle: edit == true? "Edição do endereço"  : "Adicionar endereço"
      }
  };

  constructor(props) {
    super(props);
    this.props = props;
    const edit = this.props.navigation.getParam('edit');
    const place =  this.props.navigation.getParam('place');
    
    if(edit != undefined) {
        speak("Deseja editar o endereço de " + place + "? Qual o endereço?");
    } else {
        speak("Deseja adicionar o endereço de " + place + "? Qual o endereço?");
    }

    this.state = {
      region: null, 
      destination: null,
      duration: null,
      location: null,
      latitudeOrigin: 0,
      longitudeOrigin: 0,
      edit: edit,      
    };
  }
 
  componentDidMount() {
      if ((this.props.navigation.getParam("edit")) == true) {
          
      }
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

    let obj={};
    if (this.props.navigation.getParam('key') != undefined) {
        obj = {destination: destination, 
               place: placeTitle, 
               key: this.props.navigation.getParam('key')}   
    } else {
        obj = {destination: destination, place: placeTitle};
             
    }
    this.props.navigation.navigate('SubmitFavoriteLocation', obj);
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
