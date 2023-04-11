import {useControl} from 'react-map-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { MAPBOX_TOKEN } from './MapboxConst'

function GeocoderControl(props) {
	/* Given a query in the form "lng, lat" or "lat, lng"
	* returns the matching geographic coordinate(s)
	* as search results in carmen geojson format,
	* https://github.com/mapbox/carmen/blob/master/carmen-geojson.md */
	const coordinatesGeocoder = function (query) {
		// Match anything which looks like decimal degrees coordinate pair.
		const matches = query.match(
			/^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i
		);
		if (!matches) {
			return null;
		}
		function coordinateFeature(lng, lat) {
			return {
				center: [lng, lat],
				geometry: {
					type: 'Point',
					coordinates: [lng, lat]
				},
				place_name: 'Lat: ' + lat + ' Lng: ' + lng,
				place_type: ['coordinate'],
				properties: {},
				type: 'Feature'
			};
		}
		const coord1 = Number(matches[1]);
		const coord2 = Number(matches[2]);
		const geocodes = [];
		
		if (coord1 < -90 || coord1 > 90) {
			// must be lng, lat
			geocodes.push(coordinateFeature(coord1, coord2));
		}
		if (coord2 < -90 || coord2 > 90) {
			// must be lat, lng
			geocodes.push(coordinateFeature(coord2, coord1));
		}
		if (geocodes.length === 0) {
			// else could be either lng, lat or lat, lng
			geocodes.push(coordinateFeature(coord1, coord2));
			geocodes.push(coordinateFeature(coord2, coord1));
		}
		return geocodes;
	}; 

	useControl(() => {
		const control = new MapboxGeocoder({
			accessToken: MAPBOX_TOKEN,
			marker: false,
			localGeocoder: coordinatesGeocoder,
			zoom: 8,
			placeholder: 'Try: 40, -75',
			reverseGeocode: true
		})
		return control
	},{
		position: props.position
	}
	)
}

const noop = () => {};

GeocoderControl.defaultProps = {
  marker: false,
  onLoading: noop,
  onResults: noop,
  onResult: noop,
  onError: noop
};

export default GeocoderControl;