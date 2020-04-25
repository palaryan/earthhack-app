#import "AIRGoogleMapHeatmapManager.h"
#import "AIRGoogleMapHeatmap.h"
#import "RCTConvert+Heatmaps.h"

@implementation AIRGoogleMapHeatmapManager

RCT_EXPORT_MODULE()

- (UIView *)view
{
    AIRGoogleMapHeatmap *heatmap = [[AIRGoogleMapHeatmap alloc] init];
    return heatmap;
}

RCT_EXPORT_VIEW_PROPERTY(points, GMUWeightedLatLngArray)
RCT_EXPORT_VIEW_PROPERTY(radius, NSUInteger)
RCT_EXPORT_VIEW_PROPERTY(gradient, GMUGradient)
RCT_EXPORT_VIEW_PROPERTY(opacity, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(maxIntensity, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(gradientSmoothing, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(heatmapMode, NSString)

@end
