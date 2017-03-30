
import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';

import MapView from 'react-native-maps';
import ImagePicker from 'react-native-image-picker';

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
      debugger
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

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        coor.source = source
        console.log('adding coor', coor)
        debugger
        this.setState({
          markers: [
            ...this.state.markers,
            coor,
          ]
        })

        // this.setState({
        //   avatarSource: source
        // });
        }
    });
  }

    pickImage = (coord) => {
      ImagePicker.showImagePicker({
          storageOptions: {
              skipBackup: true,    path: 'images'  }
      }, (response) => {
          if (response.didCancel) {
              console.log('User cancelled image picker');  }
          else if (response.error) {
              console.log('ImagePicker Error: ', response.error);  }
          else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);  }
          else {
          let source = { uri: response.uri };    // You can also display the image using data:    // let source = { uri: 'data:image/jpeg;base64,' + response.data };    **this**.setState({
              // image: source
              debugger
          }
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
            <MapView.Callout
              style={{
                alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Image source={element.source}
                style={{
                  width: 60, height: 60,
                  margin: 4,
                }}
              />
              <Text
                style={{
                fontSize: 12,
                }}
              >
                Marker {this.state.markers.length}
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
        onPress={(e) => {
           const { coordinate } = e.nativeEvent;

           this.pickImage(coordinate);
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
// this._onLongPressed(coordinate)