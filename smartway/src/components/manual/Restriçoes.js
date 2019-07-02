import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, WebView, } from 'react-native';
import { speak } from '../../shared/utils';

export default class Restriçoes extends Component {
  constructor(props) {
    super(props);
    speak("Restriçoes")
  }

  static navigationOptions = {
      title: "Restrições"
  };

  render() {

    var htmlContent =
      '<p> - O produto é para guiar, somente. </p>' +
      '<p> - O produto é resistente a água e não a prova d\'água. </p>' +
      '<p> - O produto resiste impactos apenas nas direções do plano do chão. </p>' +
      '<p> - O produto funciona de forma eletrônica apenas se a bateria possuir carga. </p>' +
      '<p> - O produto não funciona se os encaixes não estiverem corretos. </p>';

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
