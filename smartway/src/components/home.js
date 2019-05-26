import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Connection, Exchange, Queue } from 'react-native-rabbitmq';
import iconMap from '../assets/images/map.png';
import iconQRCode from '../assets/images/qrleitor.png';
import iconFavorite from '../assets/images/fav.png';
import iconBattery from '../assets/images/bateria.png';
import iconCrosswalk from '../assets/images/crosswalk.png';

export default class Home extends Component { 
    static navigationOptions = {
        title: "SmartWay"
    };

    constructor(props) {
      super(props);
      this.props = props;
    }

    componentWillMount() {
      const config = {
        host:'18.228.137.154',
        port:5672,
        username:'guest',
        password:'guest',
        virtualhost:'/'
      }

      connection = new Connection(config);
      connection.connect();

      let queue;
      let exchange;

      connection.on('connected', event => {

        queue = new Queue(connection, {
          name: 'message_queue',
          passive: false,
          durable: true,
          exclusive: false,
          consumer_arguments: {'x-priority': 1}
        });

        exchange = new Exchange(connection, {
          name: 'direct_log',
          type: 'direct',
          durable: false,
          autoDelete: false,
          internal: false
        });

        queue.bind(exchange, 'message_queue');

        queue.on('message', data => {
          console.warn(data.message);
        });
      });

      connection.on('error', event => {
        connection.close();
        console.log(event);
      });
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <ScrollView style={styles.container}>
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
                    <TouchableOpacity style={styles.icon} onPress={() => alert("Clicou em bateria! :D")}>
                        <Image source={iconBattery} style={styles.image} />
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


