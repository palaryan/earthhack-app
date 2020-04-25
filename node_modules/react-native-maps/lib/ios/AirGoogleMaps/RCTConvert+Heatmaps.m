#import "RCTConvert+Heatmaps.h"
#import <GoogleMaps/GoogleMaps.h>
#import <React/RCTConvert.h>
#import <React/RCTConvert+CoreLocation.h>
#import <Google-Maps-iOS-Utils/GMUWeightedLatLng.h>
#import <Google-Maps-iOS-Utils/GMUGradient.h>

@implementation RCTConvert (Heatmaps)

+ (GMUWeightedLatLng *)GMUWeightedLatLng:(id)json
{
    GMUWeightedLatLng *point = [[GMUWeightedLatLng alloc] initWithCoordinate:[self CLLocationCoordinate2D:json] intensity:[self float:json[@"weight"]]];
    return point;
}

RCT_ARRAY_CONVERTER(GMUWeightedLatLng)

+ (UIColor *)colorFromHexString:(NSString *)hexString {
    unsigned rgbValue = 0;
    NSScanner *scanner = [NSScanner scannerWithString:hexString];
    [scanner setScanLocation:1]; // bypass '#' character
    [scanner scanHexInt:&rgbValue];
    return [UIColor colorWithRed:((rgbValue & 0xFF0000) >> 16)/255.0 green:((rgbValue & 0xFF00) >> 8)/255.0 blue:(rgbValue & 0xFF)/255.0 alpha:1.0];
}

+ (GMUGradient *)GMUGradient:(id)json
{
    NSArray *colorsArray = json[@"colors"];
    NSArray *valuesArray = json[@"values"];
    
    NSMutableArray<UIColor *> *colors = [[NSMutableArray alloc] initWithCapacity:[colorsArray count]];
    
    NSMutableArray<NSNumber *> *startPoints = [[NSMutableArray alloc] initWithCapacity:[valuesArray count]];
    
    for(NSString *color in colorsArray) {
        [colors addObject:[self colorFromHexString:color]];
    }
    
    for(NSString *value in valuesArray) {
        [startPoints addObject:[[NSNumber alloc] initWithFloat:[value floatValue]]];
    }
    
    return [[GMUGradient alloc] initWithColors:colors
                                   startPoints:startPoints
                                  colorMapSize:1000];
}

@end
