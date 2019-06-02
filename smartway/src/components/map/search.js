import React, { Component } from 'react';
import { AppRegistry, TextInput, StyleSheet, View } from 'react-native';


export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Useless Placeholder' };
  }

  render() {
    return (
    <View>
      <TextInput
        style={searchs}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />
    </View>
    );
  }
}

// skip this line if using Create React Native App
// AppRegistry.registerComponent('AwesomeProject', () => UselessTextInput);

const styles = StyleSheet.create({
    search: {
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1
    }
  });