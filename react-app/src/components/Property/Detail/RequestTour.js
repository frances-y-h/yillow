import { useSelector } from "react-redux";

const RequestTour = ({ openTour }) => {
	const user = useSelector((state) => state.session.user);

	if (user && user.agent) {
		return null;
	} else {
		return (
			<button type="button" className="btn btn-w" onClick={openTour}>
				Request a tour
			</button>
		);
	}
};

export default RequestTour;
