import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, TextInput} from 'react-native';

export default class Favorites extends Component { 
    constructor(props) {
        super(props);
        this.state = { text: 'Useless Placeholder' };
      }
      
    static navigationOptions = {
        title: "Favoritos"
    };

    render() {
        return (
        <View>
          <TextInput
            style={styles.search}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
          />
        </View>
        );
      }
}    

const styles = StyleSheet.create({
    search: {
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1
    }
  });