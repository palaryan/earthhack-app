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
    TouchableWithoutFeedback,
    ActivityIndicator
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Circle } from 'react-native-maps';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import marker from './assets/marker.png';
import Modal from 'react-native-modal';
import BottomSheet from 'reanimated-bottom-sheet'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      points: [],
      search: '',
      glatitude: 32.821068,
      glongitude: -96.802863,
      latitude: 0,
      longitude: 0,
      isModalVisible: false,
      isCardVisible: false,
      hours: 0,
      searchReturn: {
        title: '',
        coordinates: {
          latitude: 0,
          longitude: 0
        },
        score: 0
      },
      card: {},
      loading: false
    };
  }
  getColorForPercentage(percentage) {
    let red = 255;
    let green = 255;
    if (percentage >= 0 && percentage <= 0.5) {
      green = 510 * percentage;
    } else if (percentage > 0.5 && percentage <= 1) {
      red = -510 * percentage + 510;
    }
  
    return 'rgb(' + [red, green, 0].join(',') + ')';
  }

  distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit=="K") { dist = dist * 1.609344 }
      if (unit=="N") { dist = dist * 0.8684 }
      return Math.round(dist);
    }
  }

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  toggleCard = () => {
    this.setState({loading: true})
    fetch(`http://54.183.39.121:1337/get_score?longbias=${this.state.glongitude}&latbias=${this.state.glatitude}&query=${this.state.search}`)
    .then((response) => response.json())
    .then((json) => {
        console.log(json)
        this.setState({ searchReturn: json });
        const distance = this.distance(this.state.glatitude, this.state.glongitude, this.state.searchReturn.coordinates.latitude, this.state.searchReturn.coordinates.longitude, 'M')
        var color = ''
        if (this.state.searchReturn.score > 75){
            color = 'red'
        } else if (this.state.searchReturn.score > 35) {
            color = 'orange'
        } else {
            color = 'green'
        }
        var transportRec = ''
        if (distance > 3) {
            transportRec = 'This location is a bit far away. You should take a car or use an environmentally cleaner alternative. 🚗'
        } else if (distance > 0.5) {
            transportRec = 'This location isn\'t too far. You can get there easily with a bike. 🚴'
        } else {
            transportRec = 'This location is pretty close. You can easily walk! 🚶‍♂️'
        }
        this.setState({card: {
            title: this.state.searchReturn.title,
            score: `${this.state.searchReturn.score}%`,
            distance: distance,
            color: color,
            transportRec: transportRec,
            latitude: this.state.searchReturn.coordinates.latitude,
            longitude: this.state.searchReturn.coordinates.longitude
        }})
        this.setState({loading: false})
        this.setState({isCardVisible: !this.state.isCardVisible});
    })
  };

  timetravel = () => {
    this.setState({loading: true})
    fetch(`http://54.183.39.121:1337/time_travel?x=${this.state.latitude}&y=${this.state.longitude}&radius=9999999&hours=${this.state.hours}`)
    .then((response) => response.json())
    .then((json) => {
        console.log(json)
        this.setState({points: json})
        this.setState({loading: false})
        this.setState({isModalVisible: false})
    })
  }

  componentDidMount(){
    this.setState({'latitude': this.state.glatitude})
    this.setState({'longitude': this.state.glongitude})
    fetch(`http://54.183.39.121:1337/nearby_users?x=${this.state.longitude}&y=${this.state.latitude}&radius=100`)
    .then((response) => response.json())
    .then((json) => {
      this.setState({ points: json });
    })
    .catch((error) => console.error(error))
  }

  mapStyle = [
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#eeeeee"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": "100"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "lightness": "0"
            },
            {
                "color": "#d0ecff"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#5594d3"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "lightness": 60
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#fafafa"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#eeeeee"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e8e8e8"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.medical",
        "elementType": "all",
        "stylers": [
            {
                "color": "#eeeeee"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#d7e6f4"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.place_of_worship",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#eeeeee"
            }
        ]
    },
    {
        "featureType": "poi.school",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#eeeeee"
            }
        ]
    },
    {
        "featureType": "poi.sports_complex",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#eeeeee"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e5e5e5"
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ebf2fa"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#eeeeee"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text",
        "stylers": [
            {
                "color": "#6f6f6f"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#eeeeee"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#a3ccf0"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }
  ]
  
  render() {
    const { points, latitude, longitude, glatitude, glongitude } = this.state;
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
            customMapStyle={this.mapStyle}
          >
          <MapView.Marker
            coordinate={{'latitude': glatitude, 'longitude': glongitude}}
            anchor={{ x: 0.5, y: 0.5 }}
            image={marker}
          />
          <MapView.Heatmap points={points}
            opacity={1}
            radius={20}
            maxIntensity={100}
            gradientSmoothing={0}
            heatmapMode={"POINTS_DENSITY"}/>
          </MapView>
        </TouchableWithoutFeedback>
        <Image source={require('./assets/logo.png')} style={styles.logo}/>
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
          <TextInput placeholder="Find a location..." style={styles.searchBar} onChangeText={text => {this.setState({ 'search': text })}} onSubmitEditing={this.toggleCard}></TextInput>
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
              onPress={this.toggleModal}
              title="Time Travel"
            />
        </View>
        <Modal isVisible={this.state.isModalVisible} backdropColor='white'>
          <View style={styles.modalContainer}>
          <TextInput placeholder="Hours to travel..." style={styles.searchBar} onChangeText={text => {this.setState({'hours': text})}} keyboardType='numeric'></TextInput>
            <Button title="Submit" onPress={this.timetravel} />
            <Text>This neural network (RNN) algorithm can take up to 2 minutes to generate data.</Text>
            <ActivityIndicator size="large" color="#0000ff" animating={this.state.loading}/>
          </View>
        </Modal>
        <Modal isVisible={this.state.isCardVisible} backdropColor='white'>
          <View style={styles.modalContainer}>
            <Text style={{fontSize: 35, fontFamily: 'AlNile-Bold'}}>{this.state.card.title}</Text>
            <Text style={{color: this.state.card.color, fontSize: 30, marginTop: 1}}>Score: {this.state.card.score}</Text>
            <Text style={{fontSize: 20, marginTop: 10, fontWeight: 'bold'}}>Distance: {this.state.card.distance} miles</Text>
            <Text style={{fontSize: 20}}>{this.state.card.transportRec}</Text>
            <Button title="Okay" onPress={this.toggleCard} style={{marginVertical: 20}}></Button>
          </View>
        </Modal>
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
  title:{
    fontSize: 50,
    fontFamily: 'AlNile-Bold'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchBar: {
    width: 300,
    backgroundColor: 'rgba(169,169,169,0.2)',
    fontSize: 20,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10
  },
  hoursInput: {
    width: 30,
    backgroundColor: 'rgba(0,0,0,1.0)',
    fontSize: 20,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10
  },
  bubble: {
    backgroundColor: 'rgba(169,169,169,0.2)',
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
    marginVertical: 620,
    width: 120,
    height: 30,
    backgroundColor: 'rgba(169,169,169,0.2)',
    borderRadius: 20
  },
  buttonText: {
    textAlign: 'center',
  },
  centeredText: { textAlign: 'center' }
});