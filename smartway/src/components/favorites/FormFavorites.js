import React, { Component } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, FlatList, ScrollView } from 'react-native';
import {addFavorite, updateData} from '../../services/FirebaseService';
import { speak } from '../../shared/utils';

/*TODO: BLoquear ediçao do nome Casa e Trabalho */

export default class FormFavorites extends Component {
  constructor(props) {
    super(props);
    
    const item = this.props.navigation.getParam('item');
    
    console.log("=======FORM FAVORITO===========")
    console.log(item)

    this.state = {
        place: item.favorito.place,
        item
    };
  }

  onSubmit = () => {
    if(this.state.item.key != undefined) {
        updateData(this.state.item.key, 'favoritos', this.state.item)
        speak("Localização editada!");
    } 
    else {
        addFavorite(this.state.item);
        speak("Local adicionado aos favoritos!");
    }  
    this.props.navigation.navigate('MenuFavorites');
  }

  render() {
    const {showSearch} = this.props;
    
    return (
      <ScrollView style={styles.container}>
            <View>
                <Text style={styles.title}>Salvar localidade favorita</Text>
            </View>

            <View style={styles.containerInput}>
                <TextInput
                style={styles.textInput}
                numberOfLines = {1}
                onChangeText={(place) => this.setState({place})}
                value={this.state.place}
                />
            </View>

            <View>
                <Text style={styles.descriptionLocation}>Descrição: {this.state.item.favorito.region.title}</Text>
            </View>

            <View style={styles.containerSubmitButton}>
                <TouchableOpacity style={styles.submitButton}
                 onPressIn={() => this.onSubmit()}>
                    <Text style={styles.submitText}>Salvar</Text>
                </TouchableOpacity>
            </View>     
        </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column', 
        backgroundColor: '#fff',
        height:160        
    },

    containerInput: {
        // position: "absolute",
        // top: 5,
        // paddingLeft: 45,
        // paddingRight: 10,
        // width: "100%",
        // alignItems: "center",
        // borderRadius: 25,
    },

    textInput: {
        fontSize: 16,
        paddingLeft: 15,
        height: 40,
        width: "100%", 
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        borderRadius: 25,
    },

    containerSubmitButton: {
        paddingRight: 10         
    },

    submitButton: {
        height: 42,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#DA552F",
        backgroundColor: "#DA552F",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        fontSize: 16,    

    },

    submitText: {
        fontSize: 16,
        color: "#FFF",
        fontWeight: "bold"
    },

    title: {
        fontSize: 20,
        color: "#333",
        fontWeight: "bold",
        alignItems:"center",
        alignContent: "center",
        marginTop: 5
    },

    descriptionLocation:{
        fontSize: 16,
        marginTop: 10
    } 
})