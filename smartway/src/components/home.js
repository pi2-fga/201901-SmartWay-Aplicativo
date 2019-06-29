import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import io from 'socket.io-client';
import { speak } from '../shared/utils';
import iconMap from '../assets/images/map.png';
import iconQRCode from '../assets/images/qrleitor.png';
import iconFavorite from '../assets/images/fav.png';
import iconBattery from '../assets/images/bateria.png';
import iconCrosswalk from '../assets/images/crosswalk.png';
import iconSmartWay from '../assets/images/smartway.png';

console.disableYellowBox = true;

export default class Home extends Component {
    constructor(props) {
      super(props);
      this.props = props;

      this.state = {
        run: true,
        batery: ""
      }
    }

    componentDidMount() {
      this.socket = io('http://18.228.137.154:5000', {transports: ['websocket']});
      this.socket.on('connect', () => speak("Smartway Conectado"));
      this.socket.on('mobile_alert', () => {
        if (this.state.run) {
          speak('Objeto detectado');
        }
      })

      this.socket.on('mobile_batery', message => {
        if (this.state.run) {
          this.setState({ batery: message });
        }
      })
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
      if (this.state.batery) {
        speak(this.state.batery + " porcento de bateria");
      } else {
        speak("Bateria não conectada")
      }
    }

    static navigationOptions = {
        title: "SmartWay"
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <ScrollView style={styles.container}>
                <View style={styles.containerIcon} accessible={true}>
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => navigate('Map')}
                        accessibilityLabel="Mapa"
                        accessibilityHint="Mapa para inserção de rota"
                        accessibilityRole="button">
                        <Image source={iconMap} style={styles.image} />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerIcon} accessible={true}>
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => navigate('MenuFavorites')}
                         accessibilityLabel="Favoritos"
                         accessibilityHint="Entra no menu de favoritos"
                         accessibilityRole="button">
                        <Image source={iconFavorite} style={styles.image} />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerIcon} accessible={true}>
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => navigate('QRCode')}
                        accessibilityLabel="QRCode"
                        accessibilityHint="Lista os pontos de ônibus"
                        accessibilityRole="button">
                        <Image source={iconQRCode} style={styles.image} />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerIcon} accessible={true}>
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => this.__getBatery()}
                        accessibilityLabel="Bateria"
                        accessibilityHint="Verifica o nível de bateria"
                        accessibilityRole="button">
                        <Image source={iconBattery} style={styles.image} />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerIcon} accessible={true}>
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => this.__toogleSmartWay()}
                        accessibilityLabel="SmartWay"
                        accessibilityHint="Ativa ou desativa a bengala smartway"
                        accessibilityRole="button">
                        <Image source={iconSmartWay} style={styles.image} />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerIcon} accessible={true}>
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => navigate('Crosswalk')}
                        accessibilityLabel="Faixa de pedestre"
                        accessibilityHint="Detecção de faixa de pedestre"
                        accessibilityRole="button">
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


