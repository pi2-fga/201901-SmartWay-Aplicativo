import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default class Home extends Component { 
    static navigationOptions = {
        title: "SmartWay"
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.qrCodeButton} onPress={() => navigate('QRCode')}>
                    <Text style={styles.qrCodeButtonText}>QR Code</Text>
                </TouchableOpacity>
            </View>
        );
    }            
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20
        
    },

    qrCodeButton: {
        height: 42,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#DA552F",
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
    },

    qrCodeButtonText: {
        fontSize: 16,
        color: "#DA552F",
        fontWeight: "bold"
    },


});    


