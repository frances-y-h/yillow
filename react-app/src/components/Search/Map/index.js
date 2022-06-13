import { useRef, useEffect } from "react";
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
	InfoWindow,
} from "react-google-maps";

import dot from "../../../assets/map/map-dot.svg";

const MyMap = withScriptjs(
	withGoogleMap((props) => {
		const mapRef = useRef(null);

		// Fit bounds function
		const fitBounds = () => {
			const bounds = new window.google.maps.LatLngBounds();
			props.markers.map((marker) => {
				bounds.extend(new window.google.maps.LatLng(marker.lat, marker.lng));
				return marker.id;
			});
			mapRef.current.fitBounds(bounds);
		};

		// Fit bounds on mount, and when the markers change
		useEffect(() => {
			fitBounds();
		}, [props.markers]);

		return (
			<GoogleMap
				ref={mapRef}
				defaultZoom={12}
				defaultCenter={{
					lat: props.center.lat,
					lng: props.center.lng,
				}}
			>
				{props.markers.map((marker) => (
					<Marker
						position={{ lat: marker?.lat, lng: marker?.lng }}
						key={marker?.id}
						icon={{ url: dot }}
						onClick={() => alert(marker)}
					></Marker>
				))}
			</GoogleMap>
		);
	})
);
export default MyMap;
