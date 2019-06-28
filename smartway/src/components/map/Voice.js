import React, { Component } from 'react';
import { WebView } from 'react-native';

export default class Voice extends Component {
  render() {
    return (
      <WebView
        source={{uri: 'https://www.google.com/maps/dir/-15.8453061,-48.1081132//@-15.8453033,-48.1432185,13z/data=!3m1!4b1!4m5!4m4!1m1!4e1!1m0!3e2!11m1!6b1'}}
        style={{marginTop: 20}}
      />
    );
  }
}
