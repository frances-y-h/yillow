import { useSelector } from "react-redux";
import bg from "../../../assets/house-bg.jpeg";

const LastImage = ({ openTour }) => {
	const user = useSelector((state) => state.session.user);

	if (user && user.agent) {
		return (
			<div
				className="property-img-bottom"
				style={{ backgroundImage: `url("${bg}")` }}
			></div>
		);
	} else {
		return (
			<div
				className="property-img-bottom"
				style={{ backgroundImage: `url("${bg}")` }}
			>
				<div className="property-img-wrap">
					<div className="property-img-caption">
						Interested in touring this home?
					</div>
					<button type="button" className="btn" onClick={openTour}>
						Take a Tour
					</button>
				</div>
			</div>
		);
	}
};

export default LastImage;
