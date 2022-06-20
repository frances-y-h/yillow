import StarFull from "../../assets/stars/star-solid.svg";
import StarHalf from "../../assets/stars/star-half.svg";
import StarOutline from "../../assets/stars/star-regular.svg";

const Stars = ({ rating }) => {
	const ratingPtg = rating * 20;

	return (
		<div className="big-star-wrap">
			<span
				className="big-star-sprite"
				style={{ width: `${ratingPtg}%` }}
			></span>
		</div>
	);
};

export default Stars;
