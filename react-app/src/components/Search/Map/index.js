import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
} from "react-google-maps";

const MyMap = withScriptjs(
	withGoogleMap((props) => (
		<GoogleMap
			defaultZoom={20}
			defaultCenter={{ lat: 34.243162, lng: -117.293741 }}
		>
			{props.isMarkerShown && (
				<Marker position={{ lat: 34.243162, lng: -117.293741 }} />
			)}
		</GoogleMap>
	))
);
export default MyMap;
