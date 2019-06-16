import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import iconHouse from '../../assets/images/house-icon.png';
import iconWork from '../../assets/images/office-icon.png';
import iconAdd from '../../assets/images/plus-icon.png';
import iconBus from '../../assets/images/icone_bus.png';
import { speak } from '../../shared/utils';

export default class Favorites extends Component {
    constructor(props) {
      super(props);
      speak("Menu com os itens de favoritos.")
    }

    static navigationOptions = {
        title: "Favoritos"
    };
 
    render() {
        const {navigate} = this.props.navigation;
        return (
            <ScrollView style={styles.container}>
                <View style={styles.containerIcon} accessible={true}>
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => navigate('Home')}
                        accessibilityLabel="Casa"
                        accessibilityHint="Rotas de casa"
                        accessibilityRole="button">
                        <Image source={iconHouse} style={styles.image} />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerIcon} accessible={true}>
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => navigate('Home')}
                        accessibilityLabel="Trabalho"
                        accessibilityHint="Rota de trabalho"
                        accessibilityRole="button">
                        <Image source={iconWork} style={styles.image} />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerIcon} accessible={true}>
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => navigate('Home')}
                        accessibilityLabel="Hospital"
                        accessibilityHint="Rota de hospital"
                        accessibilityRole="button">
                        <Image source={iconAdd} style={styles.image} />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerIcon} accessible={true}>
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => navigate('FavoritesBusLines')}
                        accessibilityLabel="Ônibus"
                        accessibilityHint="Rotas para ponto de ônibus"
                        accessibilityRole="button">
                        <Image source={iconBus} style={styles.image} />
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