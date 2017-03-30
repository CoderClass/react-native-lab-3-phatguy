
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

  getCurrentPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords
      this.setState({
        latitude,
        longitude
      })
    }, (error) => {
      console.log('error', error);
    });
  }

  _onLongPressed(coor) {
    console.log('coor', coor)

    this.setState({
      markers: [
        ...this.state.markers,
        coor
      ]
    })
  }

  renderMarkers() {
    let markers = this.state.markers
    let markerRender = []

    markers.forEach(function(element) {
        markerRender.push(
          <MapView.Marker
             key={element.latitude}
             coordinate={element}
             title={'Long press marker'}
          >
            <MapView.Callout>
              <Text>Callout</Text>
            </MapView.Callout>
          </MapView.Marker>
        )
    })
    return markerRender
  }


  render() {
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
