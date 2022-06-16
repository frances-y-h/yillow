import React from "react";
import { useRef, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
	InfoWindow,
} from "react-google-maps";

const MyMap = withScriptjs(
	withGoogleMap((props) => {
		return (
			<>
				<GoogleMap
					defaultZoom={4}
					defaultCenter={{
						lat: 34.0522,
						lng: 118.2437,
					}}
					defaultOptions={{
						fullscreenControl: false,
						streetViewControl: false,
					}}
				></GoogleMap>
			</>
		);
	})
);

export default MyMap;
