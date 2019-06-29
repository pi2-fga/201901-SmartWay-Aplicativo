import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet, Button} from 'react-native';
import api from '../../services/api';
import {addItem} from '../../services/FirebaseService.js';
import {firebaseDatabase} from '../../utils/firebase.js';

export default class BusLine extends Component { 
    static navigationOptions = {
        title: "Linhas de ônibus"
    };

    state = {
        docs: [],
    };

    componentDidMount() {
        let itemsRef = firebaseDatabase.ref('/linhasOnibus');
        
        itemsRef.on('value', (snapshot) => {
            let data = snapshot.val();
            let docs = Object.values(data);
            this.setState({docs});
         });


        // let objeto = {
        //                 descricao: "Teste",
        //                 numero: 15
        //              }
        
        // addItem(objeto);


        //FirebaseService.getDataList('linhasOnibus', dataIn => this.setState({docs: dataIn}), 10);
        //this.loadProducts();
    }
    
    loadProducts = async () => { // async await é um padrão mais simples do ES8 pra trabalhar com promise
        const response = await api.get(this.props.navigation.getParam('codBusStation'));       
        const docs = response.data;

        this.setState({docs});
    };

    renderItem = ({ item }) => (
        <View style={styles.productContainer}>
            <Text style={styles.productTitle}> {item.numero} </Text>
            <Text style={styles.productDescription}> {item.descricao} </Text>

            {/* <TouchableOpacity style={styles.productButton} onPress={() => {}}>
                <Text style={styles.productButtonText}>Acessar</Text>
            </TouchableOpacity> */}
        </View>
    );

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
            <FlatList 
                contentContainerStyle={styles.list}
                data={this.state.docs}
               
                renderItem={this.renderItem}  //função para renderizar cada item. Ele vai escrever um método pra isso this.renderItem
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fafafa"
    },

    list: {  
        padding: 20
    },

    productContainer: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor:"#DDD",
        borderRadius: 5,
        padding: 20,
        marginBottom: 20
    },

    productTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333"
    },

    productDescription: {
        fontSize: 16,
        color: "#999",
        marginTop: 5,
        lineHeight: 24
    },

    productButton: {
        height: 42,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#DA552F",
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
    },

    productButtonText: {
        fontSize: 16,
        color: "#DA552F",
        fontWeight: "bold"
    }


});