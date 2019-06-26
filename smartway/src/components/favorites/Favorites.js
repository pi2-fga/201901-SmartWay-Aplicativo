import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';
import iconHouse from '../../assets/images/house-icon.png';
import iconWork from '../../assets/images/office-icon.png';
import iconAdd from '../../assets/images/plus-icon.png';
import iconBus from '../../assets/images/icone_bus.png';
import iconLocation from '../../assets/images/Location-map-pin-marker-512.png';
import { speak } from '../../shared/utils';
import {firebaseDatabase} from '../../utils/firebase.js';

export default class Favorites extends Component {
    constructor(props) {
      super(props);
      speak("Menu com os itens de favoritos."); 
      this.state = {
        favorites: false,
        home:false,
        work:false,
        others:false,
      };
    };

    componentDidMount() {
        let itemsRef = firebaseDatabase.ref('/favoritos');
        
        itemsRef.on('value', (snapshot) => {
            let data = snapshot.val();
            let favorites = Object.values(data);
            this.setState({favorites});
                
            const homeFilter = favorites.filter((item) => item.favorito.place == 'Casa');
            this.setState({home: homeFilter});

            const workFilter = favorites.filter((item) => item.favorito.place == 'Trabalho');
            this.setState({work: workFilter});


            const otherFilter = favorites.filter((item) => item.favorito.place != 'Trabalho' && item.favorito.place != 'Casa');
            this.setState({others: otherFilter});

            console.log("------------------Outroos-----------")
            console.log(workFilter)

        });

    }     
    static navigationOptions = {
        title: "Favoritos"
    };
 
    renderItem = ({ item }) => (
            <View style={styles.productContainer}>
                <View style={styles.containerIcon} accessible={true}>
                        <TouchableOpacity
                            style={styles.icon}
                            onPress={() => navigate('FavoriteDirection', 
                                                    {destination: item.favorito.region, 
                                                    place: item.favorito.place})}
                            accessibilityLabel="Lugar"
                            accessibilityHint="Lugar"
                            accessibilityRole="button">
                            <Image source={iconLocation} style={styles.image} />
                        </TouchableOpacity>
                    </View>

            </View>
    );

    handleNavigation = (obj, place) => {
        console.log("========Trabalho========")
        console.log(obj)
        if(!obj) {
            this.props.navigation.navigate('AddFavoriteLocation', {place: place});
        } else {
            this.props.navigation.navigate('FavoriteDirection', {destination: obj[0].favorito.region, place: place});
        }
    }
    render() {
        const {navigate} = this.props.navigation;

        return (
            <ScrollView style={styles.container}>
                <View style={styles.containerIcon} accessible={true}>
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => this.handleNavigation(this.state.home, 'Casa')}
                        accessibilityLabel="Casa"
                        accessibilityHint="Rotas de casa"
                        accessibilityRole="button">
                        <Image source={iconHouse} style={styles.image} />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerIcon} accessible={true}>
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => this.handleNavigation(this.state.work, 'Trabalho')}
                        accessibilityLabel="Trabalho"
                        accessibilityHint="Rota de trabalho"
                        accessibilityRole="button">
                        <Image source={iconWork} style={styles.image} />
                    </TouchableOpacity>
                </View>   
                

                    <View>
                        <FlatList 
                            contentContainerStyle={styles.list}
                            data={this.state.others}
                            renderItem={this.renderItem}
                        />
                    </View>    
                
                <View style={styles.containerIcon} accessible={true}>
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => navigate('AddFavoriteLocation', {place: 'other'})}
                        accessibilityLabel="Hospital"
                        accessibilityHint="Rota de hospital"
                        accessibilityRole="button">
                        <Image source={iconAdd} style={styles.image} />
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