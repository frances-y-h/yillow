import { set } from "date-fns/esm";
import { useRef, useEffect, useState } from "react";
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
	InfoWindow,
} from "react-google-maps";

import { Modal } from "../../../context/Modal";
import Property from "../../Property";

const MyMap = withScriptjs(
	withGoogleMap((props) => {
		const mapRef = useRef(null);

		const iconPin = {
			path: "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z",
			fillColor: "#ef3d4d",
			strokeColor: "#ffffff",
			strokeWeight: 2,
			fillOpacity: 1,
			scale: 0.03, //to reduce the size of icons
		};

		const priceLabel = (price) => {
			let newPrice;
			if (price > 1000000) {
				newPrice = (price / 1000000).toFixed(2);
				return `${newPrice}M`;
			} else {
				newPrice = price / 1000;
				return `${newPrice}K`;
			}
		};

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
				{props.markers.map((marker) => {
					const label = priceLabel(marker?.price);
					const [isOpen, setIsOpen] = useState(false);
					const [showModal, setShowModal] = useState(false);

					return (
						<Marker
							position={{ lat: marker?.lat, lng: marker?.lng }}
							key={marker?.id}
							icon={iconPin}
							onClick={() => setShowModal(true)}
							onMouseOver={() => setIsOpen(true)}
							onMouseOut={() => setIsOpen(false)}
							label={label}
						>
							{isOpen && (
								<InfoWindow>
									<div className="gm-div">
										<img
											className="gm-img"
											src={marker.front_img}
											alt="House"
										/>
										<div className="gm-desc">
											<div className="price">${label}</div>
											<div>
												{marker.bed} bd, {marker.bath} ba
											</div>
											<div>{marker.sqft} sqft</div>
										</div>
									</div>
								</InfoWindow>
							)}
							{showModal && (
								<Modal onClose={() => setShowModal(false)}>
									<Property
										property={marker}
										onClose={() => setShowModal(false)}
									/>
								</Modal>
							)}
						</Marker>
					);
				})}
			</GoogleMap>
		);
	})
);
export default MyMap;
