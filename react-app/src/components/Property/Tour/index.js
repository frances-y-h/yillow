import { useState } from "react";
import SelectDate from "./SelectDate";

const Tour = ({ property }) => {
	const [startDate, setStartDate] = useState(new Date());
	const [tourTime, setTourTime] = useState();

	const [showSelectDate, setShowSelectDate] = useState(true);

	return (
		<div className="tour-ctrl">
			<div className="tour-top">
				<div>Tour with a Buyer's Agent</div>
				<i className="fa-solid fa-xmark"></i>
			</div>
			<div className="tour-btm">
				{showSelectDate ? <SelectDate property={property} /> : <div>Other</div>}
			</div>
		</div>
	);
};

export default Tour;
