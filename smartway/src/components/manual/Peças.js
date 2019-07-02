import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, WebView, } from 'react-native';
import { speak } from '../../shared/utils';

export default class Produto extends Component {
  constructor(props) {
    super(props);
    speak("Peças do Smart way")
  }

  static navigationOptions = {
      title: "Peças"
  };

  render() {

    var htmlContent =
      '<p> - Bengala eletrônica </p>' +
      '<p> - Bateria </p>' +
      '<p> - Carregador </p>' +
      '<p> - Luvas de encaixe </p>' +
      '<p> - Cabo de carregamento </p>' +
      '<p> Detector de faixa de pedestres </p>' +
      ' <p> - Sensor indicativo de obstáculos </p>' +
      ' <p> - Sensores sonoros </p>' +
      ' <p> - Manuais escrito e em braile </p>';

    return (
        <WebView
        style={styles.container}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        source={{ html: htmlContent  }}
        />
        );
    }
  }

const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: "center",
alignItems: "center",
backgroundColor: "#e5e5e5",
  },
});
