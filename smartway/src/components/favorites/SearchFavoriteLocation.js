import React, { Component } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, FlatList, ScrollView } from 'react-native';
import Search from '../map/Search';
import { speak } from '../../shared/utils';

/*TODO: Add descrição do endereço do local mesmo. 
    Descrição:
    Endereço:  
TODO: Verificar speak no didMount
TODO: BUG: lugar tá undefined na edição de endereço e é isso ái.
TODO: BUG: endereço de other???
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
    const item = this.props.navigation.getParam('item');
    const place = this.props.navigation.getParam('place')
      
    
    if(edit != undefined) {
        speak("Deseja editar o endereço de " + item.favorito.place + "? Qual o endereço?");
    } else if(place != "other"){
        speak("Deseja adicionar o endereço de " + place + "? Qual o endereço?");
    } else {
        speak("Deseja adicionar o endereço? Qual o endereço?");    
    }

    this.state = {
      region: null, 
      destination: null,
      duration: null,
      location: null,
      latitudeOrigin: 0,
      longitudeOrigin: 0,
      edit: edit,
      item,      
    };
  }
 
  componentDidMount() {
      if ((this.props.navigation.getParam("edit")) == true) {
          
      }
  } 
  
  componentWillUnmount () {
    speak("Menu com itens de favoritos");
  }

  handleLocationSelected = (data, { geometry }) => {
    console.log("@@@@@@@@@@@@@@ DATA DESCRIPTION @@@@@@@@@@@@@@@@")
    console.log(data.description)

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
    console.log("========STATE FAVORITO EM SEARCH FAVORITE==========")
    console.log(this.state.item)
    if(this.state.item == undefined) {
        obj = {favorito:
            {region: destination, 
            place: placeTitle,
            description: data.description}
          };
    } else if ( this.state.item.key != undefined) {
        obj = {favorito:
                {region: destination, 
                place: placeTitle}, 
                key:this.state.item.key,
                description: data.description}   
    }
    this.props.navigation.navigate('SubmitFavoriteLocation', {item: obj});
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
