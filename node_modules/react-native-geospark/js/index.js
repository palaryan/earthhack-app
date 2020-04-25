
import {NativeEventEmitter,NativeModules} from 'react-native';

if (!NativeModules.RNGeoSpark) {
  throw new Error('NativeModules.RNGeoSpark is undefined');
}

const eventEmitter = new NativeEventEmitter(NativeModules.RNGeoSpark);

const Type = {
 ALL : 'ALL',
 STOP : 'STOP',
 WALK :'WALK',
 DRIVE : 'DRIVE',
 BICYCLE : 'BICYCLE',
 FOREGROUND : 'FOREGROUND',
 BACKGROUND : 'BACKGROUND',
 ALWAYS_ON : 'ALWAYS_ON',
}

const IOSType = {
 All: 'GSAll',
 Running: 'GSRunning',
 Walking: 'GSWalking',
 AutoMotive: 'GSAutoMotive',
 Stationary: 'GSStationary',
 Foreground: 'GSForeground',
 Terminated: 'GSTerminated',
 Background: 'GSBackground',
 AlwaysOn: 'GSAlwaysOn'
}

const disableBatteryOptimization = () => {
  NativeModules.RNGeoSpark.disableBatteryOptimization();
};

const isBatteryOptimizationEnabled = (callback) => {
  NativeModules.RNGeoSpark.isBatteryOptimizationEnabled(callback);
};

const checkMotionPermission = (callback) => {
  NativeModules.RNGeoSpark.checkMotionPermission(callback);
};

const checkBackgroundLocationPermission = (callback) => {
  NativeModules.RNGeoSpark.checkBackgroundLocationPermission(callback);
};

const checkLocationPermission = (callback) => {
  NativeModules.RNGeoSpark.checkLocationPermission(callback);
};

const checkLocationServices = (callback) => {
  NativeModules.RNGeoSpark.checkLocationServices(callback);
};

const requestMotionPermission = () => {
  NativeModules.RNGeoSpark.requestMotionPermission();
};

const requestBackgroundLocationPermission = () => {
  NativeModules.RNGeoSpark.requestBackgroundLocationPermission();
};

const requestLocationPermission = () => {
  NativeModules.RNGeoSpark.requestLocationPermission();
};

const requestLocationServices = () => {
  NativeModules.RNGeoSpark.requestLocationServices();
};

const isLocationTracking = (callback) => {
  NativeModules.RNGeoSpark.isLocationTracking(callback);
};

const getDeviceToken = (callback) => {
  NativeModules.RNGeoSpark.getDeviceToken(callback);
};

const createUser = (description,successCallback,errorCallback) => {
  NativeModules.RNGeoSpark.createUser(description,successCallback,errorCallback);
};

const getUser = (userid,successCallback,errorCallback) => {
  NativeModules.RNGeoSpark.getUser(userid,successCallback,errorCallback);
};

const setDescription = (description,successCallback,errorCallback) => {
  NativeModules.RNGeoSpark.setDescription(description,successCallback,errorCallback);
};

const startTrip = (tripId,description,successCallback,errorCallback) => {
  NativeModules.RNGeoSpark.startTrip(tripId,description,successCallback,errorCallback);
};

const resumeTrip = (tripId,successCallback,errorCallback) => {
  NativeModules.RNGeoSpark.resumeTrip(tripId,successCallback,errorCallback);
};

const pauseTrip = (tripId,successCallback,errorCallback) => {
  NativeModules.RNGeoSpark.pauseTrip(tripId,successCallback,errorCallback);
};

const endTrip = (tripId,successCallback,errorCallback) => {
  NativeModules.RNGeoSpark.endTrip(tripId,successCallback,errorCallback);
};

const activeTrips = (successCallback,errorCallback) => {
  NativeModules.RNGeoSpark.activeTrips(successCallback,errorCallback);
};

const toggleEvents = (geofence,trip,activity,successCallback,errorCallback) => {
  NativeModules.RNGeoSpark.toggleEvents(geofence,trip,activity,successCallback,errorCallback);
};

const getEventsStatus = (successCallback,errorCallback) => {
  NativeModules.RNGeoSpark.getEventsStatus(successCallback,errorCallback);
};

const startTracking = () => {
  NativeModules.RNGeoSpark.startTracking();
};

const stopTracking = () => {
  NativeModules.RNGeoSpark.stopTracking();
};

const getCurrentLocation = (accuracy,successCallback,errorCallback) => {
  NativeModules.RNGeoSpark.getCurrentLocation(accuracy,successCallback,errorCallback);
};

const getCurrentLocationIos = (accuracy,successCallback) => {
  NativeModules.RNGeoSpark.getCurrentLocation(accuracy,successCallback);
};

const updateCurrentLocation = (accuracy) => {
  NativeModules.RNGeoSpark.updateCurrentLocation(accuracy);
};

const logout = (successCallback,errorCallback) => {
  NativeModules.RNGeoSpark.logout(successCallback,errorCallback);
};

const setTrackingInAppState = (types) =>{
  NativeModules.RNGeoSpark.setTrackingInAppState(types);
}

const setTrackingInMotion = (types) => {
  NativeModules.RNGeoSpark.setTrackingInMotion(types);
}

const startListener = (event, callback) => (
  eventEmitter.addListener(event, callback)
);

const stopListener = (event, callback) => {
  if (callback) {
    eventEmitter.removeListener(event, callback);
  } else {
    eventEmitter.removeAllListeners(event);
  }
};

const GeoSpark = {
 Type,
 IOSType,
 checkMotionPermission,
 checkBackgroundLocationPermission,
 checkLocationPermission,
 checkLocationServices,
 requestMotionPermission,
 requestBackgroundLocationPermission,
 requestLocationPermission,
 requestLocationServices,
 disableBatteryOptimization,
 isBatteryOptimizationEnabled,
 getDeviceToken,
 createUser,
 getUser,
 setDescription,
 toggleEvents,
 getEventsStatus,
 startTrip,
 resumeTrip,
 pauseTrip,
 endTrip ,
 activeTrips,
 startTracking,
 stopTracking,
 getCurrentLocation,
 getCurrentLocationIos,
 updateCurrentLocation,
 logout,
 setTrackingInAppState,
 setTrackingInMotion,
 startListener,
 stopListener
};

export default GeoSpark;