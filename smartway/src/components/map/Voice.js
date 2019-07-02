import React, { Component } from 'react';
import { WebView } from 'react-native';

export default class Voice extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      titleDestination: this.props.navigation.getParam("titleDestination"),
      region: this.props.navigation.getParam("region")
    }
  }

  render() {
    
    return (
      <WebView
        source={{uri: 'https://www.google.com/maps/dir/?api=1&origin=' +
                this.state.region.latitude + ',' + this.state.region.longitude + 
                '&travelmode=walking&dir_action=navigate&destination=' + this.state.titleDestination}}
        style={{marginTop: 20}}
      />
    );
  }
}