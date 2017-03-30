
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class App extends Component {
  render() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log('position', position)
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
    return (
      <View>
        <Text>
          App
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
});

