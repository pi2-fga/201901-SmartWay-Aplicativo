import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { crosswalkDetectionAPI } from './api';
import { loadingAlert } from '../../shared/alerts';

class CrosswalkDetector extends Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.state = { showAlert: false }
  }

  takePicture = async () => {
    try {
      if (this.camera) {
        const options = {
          quality: 0.5,
          base64: true,
          forceUpOrientation: true,
          fixOrientation: true
        };
        const data = await this.camera.takePictureAsync(options);

        this.detectCrosswalk(data);
      }
    } catch(error) {
      console.warn(error);
    }
  };

  detectCrosswalk(img) {
    this.alert = loadingAlert("Enviando...", "Enviando os dados, por favor espere.");
    this.setState({ showAlert: true });

    crosswalkDetectionAPI(img)
      .then(response => this.detectedFeedback(response.data))
      .catch(error => console.warn(error))
  }

  detectedFeedback(data) {
    const { navigate } = this.props.navigation;
    console.warn(data.result)
    console.warn(data.message);
    this.setState({ showAlert: false });
    navigate('Home')

  }

  render() {
    return (
        <View style={styles.container}>
          <RNCamera
            ref={camera => this.camera = camera}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            autoFocus={RNCamera.Constants.AutoFocus.on}
            flashMode={RNCamera.Constants.FlashMode.off}
            captureAudio={false}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={this.takePicture} style={styles.capture}>
              <Text style={styles.buttonText}>Capturar</Text>
            </TouchableOpacity>
          </View>
          {this.state.showAlert ? this.alert : null}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black"
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  buttonContainer: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "center"
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20
  },
  buttonText: {
    fontSize: 14
  }
});

export default CrosswalkDetector;