import React, { Component } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, FlatList, ScrollView } from 'react-native';
import {addFavorite} from '../../services/FirebaseService';
import { speak } from '../../shared/utils';

export default class FormFavorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
        place: "Casa",
    };
  }

  onSubmit = (place, destination) => {
      addFavorite({region: destination, place: place});
    //   alert("Local adicionado aos favoritos!");
    speak("Local adicionado aos favoritos!");
    this.props.navigation.navigate('Favorites');
  }

  render() {
    const {destination} = this.props;
    const {place} = this.props;
    const {navigation} = this.props;
    
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
                value={place}
                />
            </View>

            <View>
                <Text style={styles.descriptionLocation}>Descrição: {destination.title}</Text>
            </View>

            <View style={styles.containerSubmitButton}>
                <TouchableOpacity style={styles.submitButton}
                 onPressIn={() => this.onSubmit(place, destination)}>
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