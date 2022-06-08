import { useState } from "react";
// import { useSelector } from "react-redux";
import SelectDate from "./SelectDate";

const Tour = ({ property }) => {
	// const user = useSelector((state) => state.session.user);

	// const [startDate, setStartDate] = useState(new Date());
	// const [tourTime, setTourTime] = useState();

	const [showSelectDate, setShowSelectDate] = useState(true);

	Date.prototype.addDays = function (days) {
		var date = new Date(this.valueOf());
		date.setDate(date.getDate() + days);
		return date;
	};

	const available = () => {
		const today = new Date();
		const tour = {};

		for (let i = 1; i < 9; i++) {
			const thisDay = today.addDays(i);

			tour[i] = thisDay;
		}
		return tour;
	};

	return (
		<div className="tour-ctrl">
			<div className="tour-top">
				<div>Tour with a Buyer's Agent</div>
				<i className="fa-solid fa-xmark"></i>
			</div>
			<div className="tour-btm">
				{showSelectDate ? (
					<SelectDate property={property} available={available()} />
				) : (
					<div>Other</div>
				)}
			</div>
		</div>
	);
};

export default Tour;
