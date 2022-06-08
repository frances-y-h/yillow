import { useSelector } from "react-redux";

import LastImage from "./LastImg";
import bg from "../../../assets/house-bg.jpeg";

const Images = ({ property, openTour }) => {
	const images = useSelector((state) => state.images);

	return (
		<div className="property-imgs-ctrl">
			<div
				className="property-front"
				style={{ backgroundImage: `url("${property?.front_img}")` }}
			></div>
			<div className="property-imgs-wrap">
				{Object.values(images).map((image, idx) => (
					<div
						key={"image" + idx}
						className="property-img"
						style={{ backgroundImage: `url("${image?.img_url}")` }}
					></div>
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
