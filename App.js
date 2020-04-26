import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    TextInput,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Image,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import axios from 'axios';
import { Button, SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      points: [],
      search: '',
      latitude: 32.967647,
      longitude: -96.99669581
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
    const { points, latitude,longitude } = this.state;
    const updateCoords = () => {
      this.setState({'latitude': 10})
    }
    return (
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
              latitude: latitude,
              longitude: longitude,
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
        </TouchableWithoutFeedback>
        <Image source={require('./assets/logo.png')} style={styles.logo}/>
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
          <TextInput placeholder="Find a location..." style={styles.searchBar} onChangeText={text => {this.setState({'search': text})}} onSubmitEditing={() => console.log(this.state.search)}></TextInput>
        </KeyboardAvoidingView>
        <View style={styles.buttonContainer}>
            <Button
              icon={
                <Icon
                  name="clock-o"
                  size={15}
                  color="white"
                />
              }
              onPress={updateCoords}
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
    flexDirection: 'column',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchBar: {
    width: 300,
    backgroundColor: 'rgba(255,255,255,0.7)',
    fontSize: 20,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10
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
    width: 25,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5
  },
  buttonContainer: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  logo: {
    marginVertical: 650,
    width: 120,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 20
  },
  buttonText: {
    textAlign: 'center',
  },
  centeredText: { textAlign: 'center' }
});