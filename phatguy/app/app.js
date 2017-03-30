
import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';

import MapView from 'react-native-maps';
import ImagePicker from 'react-native-image-picker';
import Lightbox from 'react-native-lightbox'

export default class App extends Component {
  constructor(props) {
    super(props)
  }

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

  _onLongPressed = (coor) => {
    var options = {
      title: 'Select Avatar',
      customButtons: [
        {name: 'fb', title: 'Choose Photo from Facebook'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
        coor.source = source
        this.setState({
          markers: [...this.state.markers, coor]
        })
        }
    });
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
            <MapView.Callout
              style={{
                alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Lightbox
                renderContent={() => {
                  return (<Image source={element.source}
                         style={{
                           flex: 1,
                         }}
                  />);
                }}
            >
              <Image source={element.source}
                style={{
                  width: 60, height: 60,
                  margin: 4,
                }}
              />
            </Lightbox>
              <Text
                style={{
                fontSize: 12,
                }}
              >
              </Text>
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
        onLongPressed={(e) => {
           const { coordinate } = e.nativeEvent;
           this._onLongPressed(coordinate);
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
