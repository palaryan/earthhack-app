package com.airbnb.android.react.maps;

import android.content.Context;
import android.graphics.Color;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.TileOverlay;
import com.google.android.gms.maps.model.TileOverlayOptions;
import com.google.maps.android.heatmaps.Gradient;
import com.google.maps.android.heatmaps.HeatmapTileProvider;
import com.google.maps.android.heatmaps.WeightBasedHeatmapTileProvider;
import com.google.maps.android.heatmaps.WeightedLatLng;

import org.apache.commons.math3.analysis.interpolation.LinearInterpolator;
import org.apache.commons.math3.analysis.polynomials.PolynomialSplineFunction;

import java.util.ArrayList;
import java.util.List;

public class AirMapHeatmap extends AirMapFeature {

  private static final String POINTS_DENSITY = "POINTS_DENSITY";
  private static final String POINTS_WEIGHT = "POINTS_WEIGHT";
  private TileOverlayOptions tileOverlayOptions;
  private TileOverlay tileOverlay;
  private HeatmapTileProvider heatmapTileProvider;
  private WeightBasedHeatmapTileProvider weightBasedHeatmapTileProvider;
  private List<WeightedLatLng> points;
  private int radius;
  private Gradient gradient;
  private double opacity;
  private double maxIntensity;
  private double gradientSmoothing;
  private float cameraZoom;
  private String heatmapMode;
  public static final int MIN_RADIUS = 10;
  private PolynomialSplineFunction radiusForZoomFunction;

  public AirMapHeatmap(Context context) {
    super(context);
  }

  public void refreshMap() {
    if (tileOverlay != null) {
      tileOverlay.clearTileCache();
    }
  }

  public void setPoints(ReadableArray points) {
    this.points = new ArrayList<>(points.size());
    for (int i = 0; i < points.size(); i++) {
      ReadableMap point = points.getMap(i);
      WeightedLatLng weightedLatLng;
      LatLng latLng = new LatLng(point.getDouble("latitude"), point.getDouble("longitude"));
      weightedLatLng = new WeightedLatLng(latLng, point.getDouble("weight"));
      this.points.add(i, weightedLatLng);
    }
    if (heatmapTileProvider != null) {
      heatmapTileProvider.setWeightedData(this.points);
    } else if (weightBasedHeatmapTileProvider != null) {
      weightBasedHeatmapTileProvider.setWeightedData(this.points);
    }
    refreshMap();
  }

  public void setRadius(int radius) {
    this.radius = radius;
    if (radius < MIN_RADIUS) this.radius = MIN_RADIUS;
    if (heatmapTileProvider != null) {
      heatmapTileProvider.setRadius(this.radius);
      refreshMap();
    } else if (weightBasedHeatmapTileProvider != null) {
      weightBasedHeatmapTileProvider.setRadius(this.radius);
      refreshMap();
    }
  }

  public void setGradient(ReadableMap gradient) {
    ReadableArray rawColors = gradient.getArray("colors");
    ReadableArray rawValues = gradient.getArray("values");
    int[] colors = new int[rawColors.size()];
    float[] values = new float[rawColors.size()];
    for (int i = 0; i < rawColors.size(); i++) {
      colors[i] = Color.parseColor(rawColors.getString(i));
      values[i] = ((float) rawValues.getDouble(i));
    }

    this.gradient = new Gradient(colors, values);
    if (heatmapTileProvider != null) {
      heatmapTileProvider.setGradient(this.gradient);
      refreshMap();
    } else if (weightBasedHeatmapTileProvider != null) {
      weightBasedHeatmapTileProvider.setGradient(this.gradient);
      refreshMap();
    }
  }

  public void setOpacity(double opacity) {
    this.opacity = opacity;
    if (heatmapTileProvider != null) {
      heatmapTileProvider.setOpacity(opacity);
      refreshMap();
    } else if (weightBasedHeatmapTileProvider != null) {
      weightBasedHeatmapTileProvider.setOpacity(opacity);
      refreshMap();
    }
  }

  public void setMaxIntensity(double maxIntensity) {
    this.maxIntensity = maxIntensity;
    if (weightBasedHeatmapTileProvider != null) {
      weightBasedHeatmapTileProvider.setMaxIntensity(maxIntensity);
    }
  }

  public void setGradientSmoothing(double gradientSmoothing) {
    this.gradientSmoothing = gradientSmoothing;
  }

  public void setHeatmapMode(String heatmapMode) {
    this.heatmapMode = heatmapMode;
  }

  public void setOnZoomRadiusChange(ReadableMap onZoomRadiusChange) {
    ReadableArray rawZooms = onZoomRadiusChange.getArray("zoom");
    ReadableArray rawRadiuses = onZoomRadiusChange.getArray("radius");
    if (rawZooms.size() > 0) {
      double[] zooms = new double[rawZooms.size()];
      double[] radiuses = new double[rawZooms.size()];
      for (int i = 0; i < rawZooms.size(); i++) {
        zooms[i] = rawZooms.getDouble(i);
        radiuses[i] = rawRadiuses.getDouble(i);
      }
      LinearInterpolator interp = new LinearInterpolator();
      radiusForZoomFunction = interp.interpolate(zooms, radiuses);
    }
  }

  public TileOverlayOptions getTileOverlayOptions() {
    if (tileOverlayOptions == null) {
      tileOverlayOptions = createHeatmapOptions();
    }
    return tileOverlayOptions;
  }

  private TileOverlayOptions createHeatmapOptions() {
    TileOverlayOptions options = new TileOverlayOptions();
    switch (this.heatmapMode) {
      case POINTS_DENSITY:
        if (heatmapTileProvider == null) {
          heatmapTileProvider = new HeatmapTileProvider.Builder()
              .weightedData(this.points)
              .radius(this.radius)
              .gradient(this.gradient)
              .opacity(this.opacity)
              .build();
        }
        options.tileProvider(heatmapTileProvider);
        break;
      case POINTS_WEIGHT:
        if (weightBasedHeatmapTileProvider == null) {
          int currentRadius = radius;
          if(radiusForZoomFunction != null) currentRadius = (int) radiusForZoomFunction.value(cameraZoom);
          weightBasedHeatmapTileProvider = new WeightBasedHeatmapTileProvider.Builder()
              .weightedData(this.points)
              .radius(currentRadius)
              .gradient(this.gradient)
              .opacity(this.opacity)
              .gradientSmoothing(this.gradientSmoothing)
              .maxIntensity(this.maxIntensity)
              .build();
        }
        options.tileProvider(weightBasedHeatmapTileProvider);
        break;
    }

    return options;
  }

  @Override
  public void addToMap(GoogleMap map) {
    cameraZoom = map.getCameraPosition().zoom;
    tileOverlay = map.addTileOverlay(getTileOverlayOptions());
  }

  @Override
  public void removeFromMap(GoogleMap map) {
    if (tileOverlay != null) {
      tileOverlay.remove();
    }
  }

  @Override
  public Object getFeature() {
    return tileOverlay;
  }

  public WeightBasedHeatmapTileProvider getWeightBasedHeatmapTileProvider() {
    return weightBasedHeatmapTileProvider;
  }

  public PolynomialSplineFunction getRadiusForZoomFunction() {
    return this.radiusForZoomFunction;
  }

}
