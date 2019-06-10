import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import io from 'socket.io-client';
import { speak } from '../shared/utils';
import iconMap from '../assets/images/map.png';
import iconQRCode from '../assets/images/qrleitor.png';
import iconFavorite from '../assets/images/fav.png';
import iconBattery from '../assets/images/bateria.png';
import iconCrosswalk from '../assets/images/crosswalk.png';

console.disableYellowBox = true;

export default class Home extends Component {
    constructor(props) {
      super(props);
      this.props = props;

      this.state = {
        run: true,
        object: false,
        batery: "100"
      }
    }

    componentDidMount() {
      this.socket = io('http://18.228.137.154:5000', {transports: ['websocket']});
      this.socket.on('connect', () => speak("Smartway Conectado"));
      this.socket.on('mobile', (message) => {
        let result = JSON.parse(message);
        this.setState({
          object: result.object,
          batery: result.batery
        });

        this.__runFeedback();
        this.setState({ object: false });
      })
    }

    __runFeedback() {
      if (this.state.run) {
        speak('Objeto detectado');
      }
    }

    __toogleSmartWay() {
      const connected = !this.state.run;
      this.setState({ run: connected });

      if (connected) {
        speak("smartway conectado");
      } else {
        speak("smartway desconectado");
      }
    }

    __getBatery() {
      speak(this.state.batery + " porcento de bateria");
    }

    static navigationOptions = {
        title: "SmartWay"
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <ScrollView style={styles.container}>
                <View style={styles.containerIcon}>
                    <TouchableOpacity style={styles.icon} onPress={() => navigate('Map')}>
                        <Image source={iconMap} style={styles.image} />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerIcon}>
                    <TouchableOpacity style={styles.icon} onPress={() => navigate('Favorites')}>
                        <Image source={iconFavorite} style={styles.image} />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerIcon}>
                    <TouchableOpacity style={styles.icon} onPress={() => navigate('QRCode')}>
                        <Image source={iconQRCode} style={styles.image} />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerIcon}>
                    <TouchableOpacity style={styles.icon} onPress={() => this.__getBatery()}>
                        <Image source={iconBattery} style={styles.image} />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerIcon}>
                    <TouchableOpacity style={styles.icon} onPress={() => this.__toogleSmartWay()}>
                        <Image source={iconQRCode} style={styles.image} />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerIcon}>
                    <TouchableOpacity style={styles.icon} onPress={() => navigate('Crosswalk')}>
                        <Image source={iconCrosswalk} style={styles.image} />
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


