package com.airbnb.android.react.maps;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;

public class AirMapHeatmapManager extends ViewGroupManager<AirMapHeatmap> {
    @Override
    public String getName() {
        return "AIRMapHeatmap";
    }

    @Override
    protected AirMapHeatmap createViewInstance(ThemedReactContext reactContext) {
        return new AirMapHeatmap(reactContext);
    }

    @ReactProp(name = "points")
    public void setPoints(AirMapHeatmap view, ReadableArray points) {
        view.setPoints(points);
    }

    @ReactProp(name = "radius", defaultInt = 10)
    public void setRadius(AirMapHeatmap view, int radius) {
        view.setRadius(radius);
    }

    @ReactProp(name = "gradient")
    public void setGradient(AirMapHeatmap view, ReadableMap gradient) {
        view.setGradient(gradient);
    }

    @ReactProp(name = "opacity", defaultDouble = 0.7)
    public void setOpacity(AirMapHeatmap view, double opacity) {
        view.setOpacity(opacity);
    }

    @ReactProp(name = "maxIntensity", defaultDouble = 0)
    public void setMaxIntensity(AirMapHeatmap view, double maxIntensity) {
        view.setMaxIntensity(maxIntensity);
    }

    @ReactProp(name = "gradientSmoothing", defaultDouble = 10)
    public void setGradientSmoothing(AirMapHeatmap view, double gradientSmoothing) {
        view.setGradientSmoothing(gradientSmoothing);
    }

    @ReactProp(name = "heatmapMode")
    public void setHeatmapMode(AirMapHeatmap view, String heatmapMode) {
        view.setHeatmapMode(heatmapMode);
    }

    @ReactProp(name = "onZoomRadiusChange")
    public void onZoomRadiusChange(AirMapHeatmap view, ReadableMap onZoomRadiusChange) {
        view.setOnZoomRadiusChange(onZoomRadiusChange);
    }
}