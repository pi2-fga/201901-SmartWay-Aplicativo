import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, WebView, } from 'react-native';
import { speak } from '../../shared/utils';

export default class Produto extends Component {
  constructor(props) {
    super(props);
    speak("O Produto")
  }

  static navigationOptions = {
      title: "O produto"
  };

  render() {

    var htmlContent =
            '<p> - O produto Smart way fornece ao usuário, de forma sofisticada, a locomoção inteligente, informando os obstáculos superiores, lateris e dianteiros, além de reconhecimento de faixa de pedestres </p>' +
            '<p> - O produto informa, por meio de sinal sonoro, a quantidade de carga e quando é necessário recarregar em alguma fonte de energia. </p>' +
            '<p> - O produto possui um suporte para as mãos, produzindo conforto ao movimentar o mesmo. </p>' +
            '<p> - Por meio de comando de voz e auxílio de aplicativo, o usuário poderá informar o seu locar de partida e destino para que seja traçada uma rota. </p>' +
            '<p> - O produto informa, por meio de sinais sonoros, a rota e a direção que o usuário deverá seguir. </p>' +
            '<p> - Encontra-se disponível uma versão deste manual em braile. </p>' +
            '<p> - Materiais leves e resistentes foram selecionados para promover uma melhor ergonomia e mobilidade. </p>' +
            '<p> - O produto contém na plataforma Play Store um aplicativo para download gratuito. </p>';

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
