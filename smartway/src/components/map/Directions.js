import React from "react";
import MapViewDirections from "react-native-maps-directions";

const coordinates = [
  {
    latitude:37.798790,
    longitude:-122.442753
  },
  {
    latitude:37.790651,
    longitude:-122.442497
  }
]

const Directions = ({ destination, origin, onReady }) => (
  <MapViewDirections
    destination={destination}
    origin={origin}
    onReady={onReady}
    apikey="AIzaSyCMgW3rWewz7xBmpiqH0mTwFSZgnPF9Yn8"
    strokeWidth={3}
    strokeColor="#222"
    mode="WALKING"
  />
);

export default Directions;

