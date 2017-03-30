
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
    markers: []
  }

  _onLongPressed(coor) {
    let markers = this.state.markers
    markers += coor
  }

  renderMarkers() {
    let markers = this.state.markers
    let markerRender = []
    markers.forEach(function(element) {
        markerRender.push(
          <MapView.Marker
             coordinate={element}
             title={'Long press marker'}
          />
        )
    })
    return markerRender
  }

  render() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log('position', position)
      const { latitude, longitude } = position.coords
      this.setState({
        latitude,
        longitude
      })
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
        onLongPress={(e) => {
           const { coordinate } = e.nativeEvent;
           this._onLongPressed(coordinate)
        }}
      >
      <MapView.Marker
         coordinate={this.state}
         title={'Current position'}
       />
      {this.renderMarkers()}
      </MapView>
    )
  }
}

const styles = StyleSheet.create({
});
