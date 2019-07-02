import React, { Component, Fragment } from 'react'
import { Text, View, PermissionsAndroid } from 'react-native'
import MapView,  { Marker } from 'react-native-maps'
import Search from './Search'
import Directions from './Directions'
import { speak } from '../../shared/utils';

const PERMISSIONS = [PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION];

export default class MapKit extends Component {
  static navigationOptions = {
    headerTransparent: true
  };

  constructor(props) {
    super(props);
    this.props = props;
    const {destination} = this.props;
        
    this.state = {
      region: null,
      destination,
      duration: null,
      location: null,
      latitudeOrigin: 0,
      longitudeOrigin: 0
    };
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
    const { region, destination } = this.props;
    const { showSearch } = this.props;
    const { showsUserLocation} = this.props;

    return (
      <View style={{flex: 1}}>
        {region && 
          
          <MapView
            style={{flex: 1}}
            region = {region}
            showsUserLocation={showsUserLocation}
            loadingEnabled={true}
            ref={el => (this.mapView = el)}>

              {this.state.destination && 
                  (
                    <Fragment>
                      <Directions
                          origin={region}
                          destination={this.state.destination}
                          onReady={result => {
                            console.log("===Result routes===")
                            console.log(result.coordinates[0])
                            this.mapView.fitToCoordinates(result.coordinates, {
                              edgePadding: {
                                right: 50,
                                left: 50,
                                top: 50,
                                bottom: 50,

                              }
                            });
                            }}
                        />
                      <MapView.Marker
                      coordinate={this.state.destination}
                      title={this.state.destination.title}
                      description={this.state.destination.description}
                      /> 
                    </Fragment>
                  )
              } 
          </MapView>        
        }
        

        {region && showSearch && 
          <Search
          textPlaceholder={"Para onde?"} 
          onLocationSelected={this.handleLocationSelected} />
        }
      </View>
    )
  }
}