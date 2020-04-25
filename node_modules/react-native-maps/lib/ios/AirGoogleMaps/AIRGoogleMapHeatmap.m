#import "AIRGoogleMapHeatmap.h"

@implementation AIRGoogleMapHeatmap

- (void) refreshHeatmap {
    if(_weightTileLayer != nil) {
        _weightTileLayer.map = nil;
        [self setMap:_map];
    } else if(_densityTileLayer != nil) {
        _densityTileLayer.map = nil;
        [self setMap:_map];
    }
}

- (void) setPoints:(NSArray<GMUWeightedLatLng *> * _Nonnull)points {
    _points = points;
    [self refreshHeatmap];
}

- (void) setRadius:(NSUInteger)radius {
    _radius = radius;
    [self refreshHeatmap];
}

- (void) setMaxIntensity:(CGFloat)maxIntensity {
    _maxIntensity = maxIntensity;
    [self refreshHeatmap];
}

- (void) setOpacity:(CGFloat)opacity {
    _opacity = opacity;
    [self refreshHeatmap];
}

- (void) setGradient:(GMUGradient *)gradient {
    _gradient = gradient;
    [self refreshHeatmap];
}

- (void) setGradientSmoothing:(CGFloat)gradientSmoothing {
    _gradientSmoothing = gradientSmoothing;
    [self refreshHeatmap];
}

- (void)setMap:(AIRGoogleMap *)map {
    _map = map;
    if(map == nil) {
        if(_weightTileLayer != nil) {
            _weightTileLayer.map = nil;
        } else if(_densityTileLayer != nil) {
            _densityTileLayer.map = nil;
        }
    } else {
        if([_heatmapMode isEqualToString: @"POINTS_DENSITY"]) {
            GMUHeatmapTileLayer *tileLayer = [[GMUHeatmapTileLayer alloc] init];
            tileLayer.weightedData = _points;
            tileLayer.radius = _radius;
            tileLayer.gradient = _gradient;
            tileLayer.map = map;
            _densityTileLayer = tileLayer;
            _weightTileLayer = nil;
        } else {
            GMUWeightHeatmapTileLayer *tileLayer = [[GMUWeightHeatmapTileLayer alloc] init];
            tileLayer.weightedData = _points;
            tileLayer.radius = _radius;
            tileLayer.staticMaxIntensity = _maxIntensity;
            tileLayer.gradient = _gradient;
            tileLayer.gradientSmoothing = _gradientSmoothing;
            tileLayer.map = map;
            _weightTileLayer = tileLayer;
            _densityTileLayer = nil;
        }
    }
}

- (void)setHeatmapMode:(NSString *)heatmapMode {
    _heatmapMode = heatmapMode;
    [self refreshHeatmap];
}

@end
