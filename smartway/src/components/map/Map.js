import React, { Component, Fragment } from 'react'
import { Text, View, PermissionsAndroid, Button } from 'react-native'
import MapView,  { Marker } from 'react-native-maps'
import Search from './Search'
import Directions from './Directions'
import { speak } from '../../shared/utils';
import Voice from './Voice'

const PERMISSIONS = [PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION];

export default class Map extends Component {
  static navigationOptions = {
    headerTransparent: true
  };

  constructor(props) {
    super(props);
    this.props = props;
    speak("Mapa conectado, insira a rota de destino")

    this.state = {
      region: null, 
      destination: null,
      duration: null,
      location: null,
      latitudeOrigin: 0,
      longitudeOrigin: 0
    };
  }

  async componentDidMount() {
    PermissionsAndroid.requestMultiple(PERMISSIONS,)
      .then(granted => {
        navigator.geolocation.getCurrentPosition(
          position => {  
            let region = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.134,
              longitudeDelta: 0.143
            } 
            this.setState({region});
          },
          error => console.log(error.message),
          { enableHighAccuracy: true, timeout: 60000, maximumAge: 1000 }
        );
    }).catch(err => {
      reject(err);
    });
  }

  handleLocationSelected = (data, { geometry }) => {
       const {
      location: { lat: latitude, lng: longitude }} = geometry; //Desestruturacao do JavaScript. Só usa o que importa do objeto

    this.setState({
      destination: {
        latitude,
        longitude,
        title: data.structured_formatting.main_text
      }
    });

  };



  render() {
    const { region, destination } = this.state;
    const {navigate} = this.props.navigation;
    
    return (
      <View style={{flex: 1}}>
        {region && 
          
          <MapView
            style={{flex: 1}}
            region = {region}
            showsUserLocation={true}
            loadingEnabled={true}
            ref={el => (this.mapView = el)} 
          >
            {destination && (
            <Fragment>
              <Directions
                  origin={region}
                  destination={destination}
                  onReady={() => {}}
                />
              <MapView.Marker
              coordinate={destination}
              title={destination.title}
              description={destination.description}
              /> 
            </Fragment>
            )}

          
          </MapView>        
        }
        

        {region && 
          <Search onLocationSelected={this.handleLocationSelected} />
        }

        {region && 
          <Button
                  title="Navegar"
                  onPress={() => navigate('Voice')}
                  accessibilityLabel="Direções"
                  accessibilityHint="Direções a se percorrer"
                  accessibilityRole="button"
                />
        }
      </View>
    )
  }
}
