
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import MapView from 'react-native-maps';

export default class App extends Component {
  state = {
    longitude: -122.406417,
    latitude: 37.785834,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  }

  render() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log('position', position)
      const { latitude, longitude } = position.coords
      this.setState({
        latitude,
        longitude
      })
      /*{
            coords:
            {
                speed: -1,
                longitude: -122.406417,
                latitude: 37.785834,
                accuracy: 5,
                heading: -1,
                altitude: 0,
                altitudeAccuracy: -1
            },
            timestamp: 1490794016532.687
      }*/
    }, (error) => {
      console.log('error', error);
    });
    console.log('this.state', this.state)
    return (
      <MapView
        region={this.state}
        style={{
          flex: 1,
        }}
      >
      <MapView.Marker
         coordinate={this.state}
         title={'Current position'}
       />
      </MapView>
    )
  }
}

const styles = StyleSheet.create({
});
