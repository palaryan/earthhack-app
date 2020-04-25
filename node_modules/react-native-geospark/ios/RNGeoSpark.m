//
//  RNGeoSpark.m
//  RNGeoSpark
//
//  Copyright © 2018 GeoSpark, Inc. All rights reserved.
//

#import "RNGeoSpark.h"
#import <GeoSpark/GeoSpark.h>

@implementation RNGeoSpark{
    BOOL hasListeners;
}
RCT_EXTERN_METHOD(supportedEvents)
RCT_EXPORT_MODULE();


- (instancetype)init {
  self = [super init];
  if (self) {
    
  }
  return self;
}

- (NSArray<NSString *> *)supportedEvents {
  return @[@"events",@"location", @"error"];
}

- (void)startObserving {
  hasListeners = YES;
}

- (void)stopObserving {
  hasListeners = NO;
}


RCT_EXPORT_METHOD(createUser:(NSString *)userDescription :(RCTResponseSenderBlock)successCallback rejecter:(RCTResponseErrorBlock)errorCallback){
  dispatch_async(dispatch_get_main_queue(), ^{
    [GeoSpark createUser:userDescription :^(GeoSparkUser * user) {
      NSMutableDictionary *dict = [[NSMutableDictionary alloc] init];
      [dict setValue:user.userId  forKey:@"userId"];
      [dict setValue:user.userDescription  forKey:@"userDescription"];
      [dict setValue:[NSNumber numberWithBool:user.activityEvents]  forKey:@"activity"];
      [dict setValue:[NSNumber numberWithBool:user.tripsEvents]  forKey:@"trip"];
      [dict setValue:[NSNumber numberWithBool:user.geofenceEvents]  forKey:@"geofence"];
      NSMutableArray *array = [[NSMutableArray alloc] initWithObjects:dict, nil];
      successCallback(array);
    } onFailure:^(GeoSparkError * error) {
      errorCallback([self error:error]);
    }];
  });
}

RCT_EXPORT_METHOD(getUser:(NSString *)userId :(RCTResponseSenderBlock)successCallback rejecter:(RCTResponseErrorBlock)errorCallback){
  dispatch_async(dispatch_get_main_queue(), ^{
    [GeoSpark getUser:userId :^(GeoSparkUser * user) {
      NSMutableDictionary *dict = [[NSMutableDictionary alloc] init];
      [dict setValue:user.userId  forKey:@"userId"];
      [dict setValue:user.userDescription  forKey:@"userDescription"];
      [dict setValue:[NSNumber numberWithBool:user.activityEvents]  forKey:@"activity"];
      [dict setValue:[NSNumber numberWithBool:user.tripsEvents]  forKey:@"trip"];
      [dict setValue:[NSNumber numberWithBool:user.geofenceEvents]  forKey:@"geofence"];
      NSMutableArray *array = [[NSMutableArray alloc] initWithObjects:dict, nil];
      successCallback(array);
    } onFailure:^(GeoSparkError * error) {
      errorCallback([self error:error]);
    }];
  });
}

RCT_EXPORT_METHOD(setDescription:(NSString *)userDescription :(RCTResponseSenderBlock)successCallback rejecter:(RCTResponseErrorBlock)errorCallback){
  dispatch_async(dispatch_get_main_queue(), ^{
    [GeoSpark setDescription:userDescription :^(GeoSparkUser * user) {
      NSMutableDictionary *dict = [[NSMutableDictionary alloc] init];
      [dict setValue:user.userId  forKey:@"userId"];
      [dict setValue:user.userDescription  forKey:@"userDescription"];
      [dict setValue:[NSNumber numberWithBool:user.activityEvents]  forKey:@"activity"];
      [dict setValue:[NSNumber numberWithBool:user.tripsEvents]  forKey:@"trip"];
      [dict setValue:[NSNumber numberWithBool:user.geofenceEvents]  forKey:@"geofence"];
      NSMutableArray *array = [[NSMutableArray alloc] initWithObjects:dict, nil];
      successCallback(array);
    } onFailure:^(GeoSparkError * error) {
      errorCallback([self error:error]);
    }];
  });
}

RCT_EXPORT_METHOD(requestMotionPermission){
  [GeoSpark requestMotion];
}

RCT_EXPORT_METHOD(requestLocationPermission){
  [GeoSpark requestLocation];
}

RCT_EXPORT_METHOD(isLocationTracking){
  [GeoSpark isLocationTracking];
}

RCT_EXPORT_METHOD(checkLocationPermission :(RCTResponseSenderBlock)callback){
  NSString *str = [self checkPermission:[GeoSpark isLocationEnabled]];
  NSMutableArray *dict = [[NSMutableArray alloc] initWithObjects:str, nil];
  callback(dict);
}

RCT_EXPORT_METHOD(checkMotionPermission :(RCTResponseSenderBlock)callback){
  NSString *str = [self checkPermission:[GeoSpark isMotionEnabled]];
  NSMutableArray *dict = [[NSMutableArray alloc] initWithObjects:str, nil];
  callback(dict);
}

RCT_EXPORT_METHOD(startTrip:(NSString *)tripId trip:(NSString *)tripDes:(RCTResponseSenderBlock)successCallback rejecter:(RCTResponseErrorBlock)errorCallback){
    dispatch_async(dispatch_get_main_queue(), ^{
      [GeoSpark startTrip:tripId :@"" :^(GeoSparkTrip * trip) {
        NSMutableDictionary *dict = [[NSMutableDictionary alloc] init];
        [dict setValue:trip.msg  forKey:@"msg"];
        NSMutableArray *array = [[NSMutableArray alloc] initWithObjects:dict, nil];
        successCallback(array);
      } onFailure:^(GeoSparkError * error) {
        errorCallback([self error:error]);
      }];
    });
}

RCT_EXPORT_METHOD(endTrip:(NSString *)tripId :(RCTResponseSenderBlock)successCallback rejecter:(RCTResponseErrorBlock)errorCallback){
  dispatch_async(dispatch_get_main_queue(), ^{
    [GeoSpark endTrip:tripId :^(GeoSparkTrip * trip) {
      NSMutableDictionary *dict = [[NSMutableDictionary alloc] init];
      [dict setValue:trip.msg  forKey:@"msg"];
      NSMutableArray *array = [[NSMutableArray alloc] initWithObjects:dict, nil];
      successCallback(array);
    } onFailure:^(GeoSparkError * error) {
      errorCallback([self error:error]);
    }];
  });
}

RCT_EXPORT_METHOD(pauseTrip:(NSString *)tripId :(RCTResponseSenderBlock)successCallback rejecter:(RCTResponseErrorBlock)errorCallback){
  dispatch_async(dispatch_get_main_queue(), ^{
    [GeoSpark pauseTrip:tripId :^(GeoSparkTrip * trip) {
      NSMutableDictionary *dict = [[NSMutableDictionary alloc] init];
      [dict setValue:trip.msg  forKey:@"msg"];
      NSMutableArray *array = [[NSMutableArray alloc] initWithObjects:dict, nil];
      successCallback(array);
    } onFailure:^(GeoSparkError * error) {
      errorCallback([self error:error]);
    }];
  });
}

RCT_EXPORT_METHOD(resumeTrip:(NSString *)tripId :(RCTResponseSenderBlock)successCallback rejecter:(RCTResponseErrorBlock)errorCallback){
  dispatch_async(dispatch_get_main_queue(), ^{
    [GeoSpark resumeTrip:tripId :^(GeoSparkTrip * trip) {
      NSMutableDictionary *dict = [[NSMutableDictionary alloc] init];
      [dict setValue:trip.msg  forKey:@"msg"];
      NSMutableArray *array = [[NSMutableArray alloc] initWithObjects:dict, nil];
      successCallback(array);
    } onFailure:^(GeoSparkError * error) {
      errorCallback([self error:error]);
    }];
  });
}

RCT_EXPORT_METHOD(toggleEvents: (BOOL)geofence: (BOOL)trip: (BOOL)activity :(RCTResponseSenderBlock)successCallback rejecter:(RCTResponseErrorBlock)errorCallback){
  dispatch_async(dispatch_get_main_queue(), ^{
    [GeoSpark toggleEventsWithGeofence:geofence Trip:trip Activity:activity :^(GeoSparkUser * user) {
      NSMutableDictionary *dict = [[NSMutableDictionary alloc] init];
      [dict setValue:user.userId  forKey:@"userId"];
      [dict setValue:user.userDescription  forKey:@"userDescription"];
      [dict setValue:[NSNumber numberWithBool:user.activityEvents]  forKey:@"activity"];
      [dict setValue:[NSNumber numberWithBool:user.tripsEvents]  forKey:@"trip"];
      [dict setValue:[NSNumber numberWithBool:user.geofenceEvents]  forKey:@"geofence"];
      NSMutableArray *array = [[NSMutableArray alloc] initWithObjects:dict, nil];
      successCallback(array);
    } onFailure:^(GeoSparkError * error) {
      errorCallback([self error:error]);
    }];
  });
}

RCT_EXPORT_METHOD(getEventsStatus:(RCTResponseSenderBlock)successCallback rejecter:(RCTResponseErrorBlock)errorCallback){
  dispatch_async(dispatch_get_main_queue(), ^{
    [GeoSpark getEventsStatus:^(GeoSparkUser * user) {
      NSMutableDictionary *dict = [[NSMutableDictionary alloc] init];
      [dict setValue:user.userId  forKey:@"userId"];
      [dict setValue:user.userDescription  forKey:@"userDescription"];
      [dict setValue:[NSNumber numberWithBool:user.activityEvents]  forKey:@"activity"];
      [dict setValue:[NSNumber numberWithBool:user.tripsEvents]  forKey:@"trip"];
      [dict setValue:[NSNumber numberWithBool:user.geofenceEvents]  forKey:@"geofence"];
      NSMutableArray *array = [[NSMutableArray alloc] initWithObjects:dict, nil];
      successCallback(array);
    } onFailure:^(GeoSparkError * error) {
      errorCallback([self error:error]);
    }];
  });
}


RCT_EXPORT_METHOD(activeTrips :(RCTResponseSenderBlock)successCallback rejecter:(RCTResponseErrorBlock)errorCallback){
    [GeoSpark activeTrips:^(GeoSparkActiveTrips * trip) {
      NSMutableArray *tripsArray = [[NSMutableArray alloc] init];
      for (int i =0; i < [trip.trips count]; i++) {
        ActiveTripsResponse *tripResponse = [trip.trips objectAtIndex:i];
        NSMutableDictionary *trip = [[NSMutableDictionary alloc] init];
        trip[@"tripId"] = tripResponse.trip_id;
        trip[@"isStarted"] = @(tripResponse.isStarted);
        trip[@"isPaused"] = @(tripResponse.isPaused);
        trip[@"isEnded"] = @(tripResponse.isEnded);
        trip[@"isDeleted"] = @(tripResponse.isDeleted);
        trip[@"createdAt"] = tripResponse.createdAt;
        trip[@"updatedAt"] = tripResponse.updatedAt;
        [tripsArray addObject:trip];
      }
      NSDictionary *tripsData = [[NSDictionary alloc] initWithObjectsAndKeys:tripsArray,@"activeTrips", nil];
      NSArray *outArray = [[NSArray alloc] initWithObjects:tripsData, nil];
        successCallback(outArray);
      
    } onFailure:^(GeoSparkError * error) {
     errorCallback([self error:error]);
    }];
}

RCT_EXPORT_METHOD(startTracking){
  [GeoSpark startTracking];
}

RCT_EXPORT_METHOD(stopTracking){
  [GeoSpark stopTracking];
}

RCT_EXPORT_METHOD(logout:(RCTResponseSenderBlock)successCallback rejecter:(RCTResponseErrorBlock)errorCallback){
  dispatch_async(dispatch_get_main_queue(), ^{
    [GeoSpark logout:^(NSString * userId) {
      NSMutableDictionary *dict = [[NSMutableDictionary alloc] init];
      [dict setValue:userId forKey:@"message"];
      NSMutableArray *array = [[NSMutableArray alloc] initWithObjects:dict, nil];
      successCallback(array);
    } onFailure:^(GeoSparkError * error) {
      errorCallback([self error:error]);
    }];
  });
}

RCT_EXPORT_METHOD(accuracy:(NSInteger *)accuracy getCurrentLocation:(RCTResponseSenderBlock)successCallback){
  dispatch_async(dispatch_get_main_queue(), ^{
    [GeoSpark getCurrentLocation:*accuracy location:^(GSLocation * location) {
      NSMutableDictionary *locationDict = [[NSMutableDictionary alloc] init];
      [locationDict setValue:[NSNumber numberWithDouble:location.latitude]  forKey:@"latitude"];
      [locationDict setValue:[NSNumber numberWithDouble:location.longitude]  forKey:@"longitude"];
      [locationDict setValue:[NSNumber numberWithDouble:location.accuracy]  forKey:@"accuracy"];
      NSMutableArray *array = [[NSMutableArray alloc] initWithObjects:locationDict, nil];
      successCallback(array);
    }];
  });
}

RCT_EXPORT_METHOD(accuracy:(NSInteger *)accuracy updateCurrentLocation:(RCTResponseSenderBlock)successCallback){
  dispatch_async(dispatch_get_main_queue(), ^{
    [GeoSpark updateCurrentLocation:*accuracy];
  });
}

RCT_EXPORT_METHOD(setTrackingInAppState:(NSArray *)states){
  [GeoSpark trackLocationInAppState:states];
}

RCT_EXPORT_METHOD(setTrackingInMotion:(NSArray *)motions){
  [GeoSpark trackLocationInMotion:motions];
}

-(NSError *)error:(GeoSparkError *)error{
  return [NSError errorWithDomain:error.errorMessage code:[self removeString:error.errorCode] userInfo:nil];
}

-(NSString *)checkPermission:(BOOL)isEnabled{
  if (isEnabled){
    return @"GRANTED";
  } else {
    return @"DENIED";
  }
}

-(NSInteger)removeString:(NSString *)stringValue{
  NSMutableString *strippedString = [NSMutableString stringWithCapacity:stringValue.length];
  NSScanner *scanner = [NSScanner scannerWithString:stringValue];
  NSCharacterSet *numbers = [NSCharacterSet characterSetWithCharactersInString:@"0123456789"];
  while ([scanner isAtEnd] == NO) {
    NSString *buffer;
    if ([scanner scanCharactersFromSet:numbers intoString:&buffer]) {
      [strippedString appendString:buffer];
    } else {
      [scanner setScanLocation:([scanner scanLocation] + 1)];
    }
  }
  return @([strippedString integerValue]);
}

@end
