import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Images from "./Images";
import Detail from "./Detail";

import Tour from "./Tour";

import { Modal } from "../../context/Modal";

import * as propertyImgActions from "../../store/property_img";

const Property = ({ property, onClose }) => {
	const dispatch = useDispatch();
	const [showTour, setShowTour] = useState(false);

	const openTour = () => {
		// setTimeout(() => {
		setShowTour(true);
		// }, 1);
	};

	useEffect(() => {
		dispatch(propertyImgActions.getAllImages(property.id));
	}, [property, dispatch]);

	return (
		<div className="property-ctrl">
			<i className="fa-solid fa-xmark" onClick={onClose}></i>
			<Images property={property} openTour={openTour} />
			<Detail property={property} openTour={openTour} />
			{showTour && (
				<Modal onClose={() => setShowTour(false)}>
					<Tour property={property} />
				</Modal>
			)}
		</div>
	);
};

export default Property;
