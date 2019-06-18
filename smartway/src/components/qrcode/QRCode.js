import React, {Component} from 'react';
import { View, Text, Linking, Dimensions, StyleSheet, TouchableOpacity
        } from "react-native";
import ModalWebView from './ModalWebView'
import QRCodeScanner from "react-native-qrcode-scanner";
import api from '../../services/api';
import { speak } from '../../shared/utils'; 

export default class QRCode extends Component {    
    static navigationOptions = {
       title: 'Leitor de QR Code',
    };

    constructor(props) {
      super(props);
      this.props = props;
      speak("Camera ativada, posicione a camera no QRCode, se precisar peça ajuda.");

      this.state = {
        apiTextLength: 66,
        modalVisible: false,
        success: null,
        url: '',
      };
    }

    openLink = () => {
      Linking.openURL(this.state.url).catch(err =>
          alert("An error occured", err)
      );
      this.setState({ success: false })
    };

    handleButton = () => {
        this.setState({ modalVisible: !this.state.modalVisible, success: false })
        this.scanner.reactivate()
    }
    
    onSuccess = (e) => {
        const urlCod =  e.data
        let codBusStation = urlCod.substring(this.state.apiTextLength)
        this.props.navigation.navigate('BusLine', {codBusStation: codBusStation});
        
        // TODO: Validar valor de codBusStation.
        // Se for qualquer outro link:
        // Linking
        //   .openURL(e.data)
        //   .catch(err => console.error('An error occured', err));
      }

    render() {
        
        return (
            <View style={styles.container}>
                <QRCodeScanner
                    onRead={this.onSuccess}
                    showMarker={true}
                    checkAndroid6Permissions={true}
                    ref={(elem) => { this.scanner = elem }}
                    cameraStyle={styles.cameraContainer}
                    bottomContent={
                        <View style={styles.touchable}>
                            {this.state.success && (
                            <Text style={styles.text}>OK. Got it!</Text>
                            )}
                        </View>
                    }
                /> 

                <ModalWebView
                    handleButton={this.handleButton} 
                    modalVisible={this.state.modalVisible} 
                    url={this.state.url} 
                    openLink={this.openLink}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: "black"
    },
    
    touchable: {
      padding: 16
    },
    
    text: {
      fontSize: 21,
      color: "rgb(0,122,255)"
    },
    
    cameraContainer: {
      height: Dimensions.get('window').height,
    }
    
  });
  