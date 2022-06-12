import { useState } from "react";
import { Modal } from "../../../context/Modal";

const Image = ({ image }) => {
	const [showModal, setShowModal] = useState(false);
	return (
		<>
			<div
				className="property-img"
				style={{ backgroundImage: `url("${image?.img_url}")` }}
				onClick={() => setShowModal(true)}
			></div>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<img
						className="property-img-lg"
						src={image?.img_url}
						alt={image?.description}
						onClick={() => setShowModal(false)}
					/>
				</Modal>
			)}
		</>
	);
};

export default Image;
