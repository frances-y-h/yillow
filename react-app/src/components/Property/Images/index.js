import { useState } from "react";
import { useSelector } from "react-redux";

import { Modal } from "../../../context/Modal";

import Image from "./Image";
import LastImage from "./LastImg";

const Images = ({ property, openTour }) => {
	const images = useSelector((state) => state.images);

	const [showModal, setShowModal] = useState(false);

	return (
		<div className="property-imgs-ctrl">
			{property?.front_img && (
				<div
					className="property-front"
					style={{ backgroundImage: `url("${property?.front_img}")` }}
					onClick={() => setShowModal(true)}
				></div>
			)}
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<img
						className="property-img-lg"
						src={property?.front_img}
						alt="Front"
						onClick={() => setShowModal(false)}
					/>
				</Modal>
			)}
			<div className="property-imgs-wrap">
				{Object.values(images).map((image, idx) => (
					<Image key={"img" + idx} image={image} />
				))}
				{Object.keys(images).length % 2 !== 0 && (
					<LastImage openTour={openTour} />
				)}
			</div>
			{Object.keys(images).length % 2 === 0 && (
				<LastImage openTour={openTour} />
			)}
		</div>
	);
};

export default Images;
