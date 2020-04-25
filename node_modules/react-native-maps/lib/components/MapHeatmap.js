import PropTypes from 'prop-types';
import React from 'react';

import {
  ViewPropTypes,
  View,
} from 'react-native';

import decorateMapComponent, {
  USES_DEFAULT_IMPLEMENTATION,
  SUPPORTED,
} from './decorateMapComponent';

import {
  PROVIDER_GOOGLE,
} from './ProviderConstants';

const viewPropTypes = ViewPropTypes || View.propTypes;

const propTypes = {
    ...viewPropTypes,
    points: PropTypes.arrayOf(PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        weight: PropTypes.number,
    })),
    radius: PropTypes.number,
    gradient: PropTypes.shape({
        colors: PropTypes.arrayOf(PropTypes.string),
        values: PropTypes.arrayOf(PropTypes.number)
    }),
    opacity: PropTypes.number,
    maxIntensity: PropTypes.number,
    gradientSmoothing: PropTypes.number,
    heatmapMode: PropTypes.oneOf(['POINTS_DENSITY', 'POINTS_WEIGHT']),
    onZoomRadiusChange: PropTypes.shape({
        zoom: PropTypes.arrayOf(PropTypes.number),
        radius: PropTypes.arrayOf(PropTypes.number)
    })
};

const defaultProps = {
    points: [],
    radius: 10,
    gradient: {
        colors: ["#00E400", "#FF0000"],
        values: [0.2, 1.0]
    },
    opacity: 0.7,
    maxIntensity: 0,
    gradientSmoothing: 10,
    heatmapMode: "POINTS_DENSITY",
    onZoomRadiusChange: {
        zoom: [],
        radius: []
    }
};

class MapHeatmap extends React.Component {

    getSanitizedPoints = () => this.props.points.map((point) => ({weight: 0, ...point}));

    render() {
        const AIRMapHeatmap = this.getAirComponent();

        return (
            <AIRMapHeatmap
                points={this.getSanitizedPoints()}
                radius={this.props.radius}
                gradient={this.props.gradient}
                opacity={this.props.opacity}
                maxIntensity={this.props.maxIntensity}
                gradientSmoothing={this.props.gradientSmoothing}
                heatmapMode={this.props.heatmapMode}
                onZoomRadiusChange={this.props.onZoomRadiusChange}
            />
        );
    }
}

MapHeatmap.propTypes = propTypes;
MapHeatmap.defaultProps = defaultProps;

module.exports = decorateMapComponent(MapHeatmap, {
    componentType: 'Heatmap',
    providers: {
        google: {
            ios: SUPPORTED,
            android: USES_DEFAULT_IMPLEMENTATION,
        },
    },
});