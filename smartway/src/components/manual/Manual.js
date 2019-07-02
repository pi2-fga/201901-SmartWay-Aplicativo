import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { speak } from '../../shared/utils';

import usar from '../../assets/images/usar.png';
import produto from '../../assets/images/produto.png';
import pecas from '../../assets/images/pecas.png';
import restricoes from '../../assets/images/restricoes.png';

export default class Manual extends Component {

  constructor(props) {
    super(props);
    speak("Manual do usuário")
  }

  static navigationOptions = {
      title: "Maual do usuário"
  };

  render() {
    const {navigate} = this.props.navigation;

    return (
      <ScrollView style={styles.container}>
          <View style={styles.containerIcon} accessible={true}>
              <TouchableOpacity
                  style={styles.icon}
                  onPress={() => navigate('Produto')}
                  accessibilityLabel="Produto"
                  accessibilityHint="Como funciona o produto"
                  accessibilityRole="button">
                  <Image source={produto} style={styles.image} />
              </TouchableOpacity>
          </View>

          <View style={styles.containerIcon} accessible={true}>
              <TouchableOpacity
                  style={styles.icon}
                  onPress={() => navigate('Peças')}
                  accessibilityLabel="Peças"
                  accessibilityHint="O que vem no smart way"
                  accessibilityRole="button">
                  <Image source={pecas} style={styles.image} />
              </TouchableOpacity>
          </View>

          <View style={styles.containerIcon} accessible={true}>
              <TouchableOpacity
                  style={styles.icon}
                  onPress={() => navigate('ComoUsar')}
                  accessibilityLabel="Usar"
                  accessibilityHint="Como usar o produto smart way"
                  accessibilityRole="button">
                  <Image source={usar} style={styles.image} />
              </TouchableOpacity>
          </View>

          <View style={styles.containerIcon} accessible={true}>
              <TouchableOpacity
                  style={styles.icon}
                  onPress={() => navigate('Restriçoes')}
                  accessibilityLabel="Restrições"
                  accessibilityHint="Restrições do Smart way"
                  accessibilityRole="button">
                  <Image source={restricoes} style={styles.image} />
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
    },

    icon: {
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        padding: 10,
    },

    image: {
        width: 90,
        height: 90,
    },


});
