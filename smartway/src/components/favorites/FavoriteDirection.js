import React, { Component } from 'react';
import { Text, View, PermissionsAndroid, TouchableOpacity, StyleSheet } from 'react-native';
import MapKit from '../map/MapKit';
import { speak } from '../../shared/utils';

const PERMISSIONS = [PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION];

export default class FavoriteDirection extends Component {
    static navigationOptions = ({navigation}) => {
        const destination = navigation.getParam('destination');
        const place = navigation.getParam('place');
        const key = navigation.getParam('key');
        const favorite = navigation.getParam('favorite');

        return {
            headerTitle:            
                <View style={styles.containerSubmitButton}>
                    <TouchableOpacity style={styles.submitButton}
                    onPressIn={() => navigation.navigate('SearchFavoriteLocation', 
                                                {edit: true,
                                                destination: destination,
                                                place: place,
                                                showSearch: true,
                                                key: key})}>
                        <Text style={styles.submitText}>Editar localização</Text>
                    </TouchableOpacity>
                </View>,
            headerStyle: {height: 60 }
        }
      };

    constructor(props) {
        super(props);
        this.props = props;
        speak("Mapa conectado! Deseja editar a localização? Aperte o botão na barra superior");
        const favorito = this.props.navigation.getParam('favorito');
        this.state = {
            currentRegion: null,
            favorito,
            isMapReady: false,
        }
        console.log("===OIOIOI===")
        console.log(this.state.favorito)
    }

    async componentDidMount() {
        this.getCurrentLocation();
    }
    
      getCurrentLocation() {
        PermissionsAndroid.requestMultiple(PERMISSIONS,)
          .then(granted => {
            navigator.geolocation.getCurrentPosition(
              position => {  
                let currentRegion = {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  latitudeDelta: 0.534,
                  longitudeDelta: 0.543
                } 
                this.setState({currentRegion});
              },
              error => console.log(error.message),
              { enableHighAccuracy: true, timeout: 60000, maximumAge: 1000 }
            );
        }).catch(err => {
          reject(err);
        });
      }

    onMapLayout = () => {
    this.setState({ isMapReady: true });
    };  

    render() {
        return (
            <MapKit  
            region={this.state.currentRegion} 
            destination={this.state.favorito.region}
            showsUserLocation={true}
            showSearch={false}
            onLayout={this.onMapLayout}
            />
        )
    }
}

const styles = StyleSheet.create({
    containerSubmitButton: {
        flex: 1,
        backgroundColor: "#fafafa",
        paddingRight: 10,
    },
    
    submitButton: {
        height: 42,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#DA552F",
        backgroundColor: "#DA552F",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        fontSize: 16,
       marginRight: 20,    
    
    },
    
    submitText: {
        fontSize: 16,
        color: "#FFF",
        fontWeight: "bold"
    }
})    