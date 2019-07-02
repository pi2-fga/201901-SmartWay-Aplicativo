import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, WebView, } from 'react-native';
import { speak } from '../../shared/utils';

export default class ComoUsar extends Component {
  constructor(props) {
    super(props);
    speak("Como Usar")
  }

  static navigationOptions = {
      title: "Como Usar"
  };

  render() {

    var htmlContent =
      '<p> - Abra a caixa do produto e verifique se todas as peças estão contidas. </p>' +
      '<p> - Faça o download do aplicativo no na Play Store do seu aparelho celular com sistema operacional Android. </p>' +
      '<p> - O botão de liga/desliga se encontra abaixo do suporte para as mãos. </p>' +
      '<p> - Antes de ligar o produto, confira se o mesmo encontra-se com carga, de preferência completa, para sua maior autonomia. A bateria e a entrada de energia se encontram na parte superior do produto. </p>' +
      '<p> - Após ligado o produto, desdobre até que a junção das partes seja feita. Caso não seja feita a junção de forma correta, um sinal sonoro irá soar até que seja feita a correta junção das partes. </p>' +
      '<p> - Com as partes encaixadas de forma correta, trave as juntas com as luvas de proteção encontradas acima das junções. </p>' +
      '<p> - Após travadas as partes, coloque no braço direito o sensor indicativo de obstáculos. </p>' +
      '<p> - Coloque o sensor sonoro no pescoço para poder ouvir as instruções de direção. </p>' +
      '<p> - Abra o aplicativo e escute as instruções feitas por sinal sonoro. </p>' +
      '<p> - Coloque no aplicativo, por meio de comando de voz e localização, seu local de partida e chegada. </p>';


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
