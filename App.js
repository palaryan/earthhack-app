import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    TextInput,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Image
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import axios from 'axios';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      points: []
    };
  }

  componentDidMount(){
    fetch('http://54.183.39.121:1337/nearby_users?x=32.96769196727067&y=-96.99664910864739&radius=100')
    .then((response) => response.json())
    .then((json) => {
      this.setState({ points: json });
    })
    .catch((error) => console.error(error))
  }

  render() {
    const { points } = this.state;
    return (
      <SafeAreaView style ={styles.container}>
        <MapView
	  provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: 32.967647,
            longitude: -96.99669581,
            latitudeDelta: 0.09,
            longitudeDelta: 0.0121
          }}
        >
        <MapView.Heatmap points={points}
          opacity={1}
          radius={50}
          maxIntensity={100}
          gradientSmoothing={10}
          heatmapMode={"POINTS_DENSITY"}/>
        </MapView>
        <Image source={require('./assets/logo.png')} style={styles.logo}/>
        <View style={styles.buttonContainer}>
          <Button
            icon={
              <Icon
                name="clock-o"
                size={15}
                color="white"
              />
            }
            title="Time Travel"
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 100,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  logo: {
    marginVertical: 710,
    width: 120,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 20
  },
  buttonText: {
    textAlign: 'center',
  },
  centeredText: { textAlign: 'center' },
});