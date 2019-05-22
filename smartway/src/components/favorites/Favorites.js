import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

export default class Favorites extends Component { 
    static navigationOptions = {
        title: "Favoritos"
    };

    render() {
        return(
            <View>
                <Text>Abrindo favoritos</Text>
            </View>
        );
    }

}    