import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
} from "react-google-maps";

import dot from "../../../assets/map/map-dot.svg";

const MyMap = withScriptjs(
	withGoogleMap((props) => (
		<GoogleMap
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
	))
);
export default MyMap;
