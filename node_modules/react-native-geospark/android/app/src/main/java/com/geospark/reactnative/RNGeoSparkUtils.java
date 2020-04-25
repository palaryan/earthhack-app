package com.geospark.reactnative;

import android.location.Location;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;
import com.geospark.lib.GeoSpark;
import com.geospark.lib.model.GeoSparkActiveTrips;
import com.geospark.lib.model.GeoSparkError;
import com.geospark.lib.model.GeoSparkUser;

import java.util.ArrayList;
import java.util.List;


class RNGeoSparkUtils {

    static String isGranted(boolean hasGranted) {
        if (hasGranted) {
            return "GRANTED";
        }
        return "DENIED";
    }

    static String checkEnabled(boolean hasEnabled) {
        if (hasEnabled) {
            return "ENABLED";
        }
        return "DISABLED";
    }

    static WritableMap mapForUser(GeoSparkUser geoSparkUser) {
        if (geoSparkUser == null) {
            return null;
        }
        WritableMap map = Arguments.createMap();
        map.putString("userId", geoSparkUser.getUserId());
        map.putString("userDescription", geoSparkUser.getDescription());
        map.putBoolean("geofence", geoSparkUser.isGeofenceEventsActive());
        map.putBoolean("trip", geoSparkUser.isTripEventsActive());
        map.putBoolean("activity", geoSparkUser.isActivityEventsActive());
        return map;
    }

    static WritableMap mapForTripList(List<GeoSparkActiveTrips> trips) {
        if (trips == null && trips.size() == 0) {
            return null;
        }
        WritableMap map = Arguments.createMap();
        for (int i = 0; i < trips.size(); i++) {
            WritableMap mapData = Arguments.createMap();
            GeoSparkActiveTrips geoSparkActiveTrips = trips.get(i);
            mapData.putString("tripId", geoSparkActiveTrips.getTripId());
            mapData.putBoolean("isStarted", geoSparkActiveTrips.isStarted());
            mapData.putBoolean("isPaused", geoSparkActiveTrips.isPaused());
            mapData.putBoolean("isEnded", geoSparkActiveTrips.isEnded());
            mapData.putBoolean("isDeleted", geoSparkActiveTrips.isDeleted());
            mapData.putString("createdAt", geoSparkActiveTrips.getCreatedAt());
            mapData.putString("updatedAt", geoSparkActiveTrips.getUpdatedAt());
            map.putMap(String.valueOf(i), mapData);
        }
        return map;
    }

    static WritableMap mapForLocation(Location location) {
        if (location == null) {
            return null;
        }
        WritableMap map = Arguments.createMap();
        map.putDouble("latitude", location.getLatitude());
        map.putDouble("longitude", location.getLongitude());
        map.putDouble("accuracy", location.getAccuracy());
        map.putDouble("altitude", location.getAltitude());
        map.putDouble("speed", location.getSpeed());
        return map;
    }

    static WritableMap mapForError(GeoSparkError geoSparkError) {
        WritableMap map = Arguments.createMap();
        map.putString("errorCode", geoSparkError.getErrorCode());
        map.putString("errorMessage", geoSparkError.getErrorMessage());
        return map;
    }

    static GeoSpark.Type stringToEnum(String type) {
        return Enum.valueOf(GeoSpark.Type.class, type);
    }

    static boolean isArrayNotNull(ReadableArray readableArray) {
        return readableArray != null && readableArray.size() > 0;
    }

    static GeoSpark.Type[] arrayToEnum(ReadableArray readableArray) {
        List<GeoSpark.Type> types = new ArrayList<>();
        for (int i = 0; i < readableArray.size(); i++) {
            types.add(stringToEnum(readableArray.getString(i)));
        }
        return types.toArray(new GeoSpark.Type[types.size()]);
    }
}
