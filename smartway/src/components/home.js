import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import iconMap from '../assets/images/map.png';
import iconQRCode from '../assets/images/qrleitor.png';
import iconFavorite from '../assets/images/fav.png';
import iconBattery from '../assets/images/bateria.png'

export default class Home extends Component { 
    static navigationOptions = {
        title: "SmartWay"
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.containerIcon}>
                    <TouchableOpacity style={styles.icon} onPress={() => alert("Clicou no mapa! :D")}>
                        <Image source={iconMap} style={styles.image} />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerIcon}>
                    <TouchableOpacity style={styles.icon} onPress={() => alert("Clicou em favoritos! :D")}>
                        <Image source={iconFavorite} style={styles.image} />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerIcon}>
                    <TouchableOpacity style={styles.icon} onPress={() => navigate('QRCode')}>
                        <Image source={iconQRCode} style={styles.image} />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerIcon}>
                    <TouchableOpacity style={styles.icon} onPress={() => alert("Clicou na bateria! :D")}>
                        <Image source={iconBattery} style={styles.image} />
                    </TouchableOpacity>
                </View>
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

    containerIcon: {
        // flex: 1,
        // backgroundColor: 'transparent',
        // padding: 20
        
    },

    icon: {
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        padding: 10,
    },

    image: {
        width: 90, 
        height: 90,
    },


});    


