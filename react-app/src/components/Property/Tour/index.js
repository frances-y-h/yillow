import { useState, useEffect } from "react";
import SelectDate from "./SelectDate";
import Contact from "./Contact";

import available from "../../Tools/Available";

const Tour = ({ property, setShowTour }) => {
	const schedule = available(property);

	const [today, setToday] = useState(Object.keys(schedule)[0]);
	const [hour, setHour] = useState();
	const [showSelectDate, setShowSelectDate] = useState(true);
	const [hourList, setHourList] = useState([]);

	useEffect(() => {
		setHourList(schedule[today]);
		setHour(schedule[today][0]);
	}, []);

	return (
		<form className="tour-ctrl">
			<div className="tour-top">
				<div>Tour with a Buyer's Agent</div>
				<i className="fa-solid fa-xmark" onClick={() => setShowTour(false)}></i>
			</div>
			<div className="tour-btm">
				{showSelectDate ? (
					<SelectDate
						property={property}
						available={schedule}
						hourList={hourList}
						setHourList={setHourList}
						hour={hour}
						setHour={setHour}
						today={today}
						setToday={setToday}
						setShowSelectDate={setShowSelectDate}
					/>
				) : (
					<Contact
						property={property}
						today={today}
						setShowSelectDate={setShowSelectDate}
						hour={hour}
						setShowTour={setShowTour}
					/>
				)}
			</div>
		</form>
	);
};

export default Tour;
