import { useState, useEffect } from "react";

const SelectDate = ({
	property,
	available,
	today,
	setToday,
	hour,
	setHour,
	setShowSelectDate,
}) => {
	const [hourList, setHourList] = useState([]);

	const appointment = new Date(`${today} ${hour}`);

	useEffect(() => {
		setHourList(available[today]);
		setHour(available[today][0]);
	}, [today, available, setHour]);

	return (
		<>
			<div className="tour-type">In-person</div>
			<div className="tour-prefered">Select a preferred time</div>
			<div className="tour-date-wrap">
				<select
					className="select-input"
					value={today}
					onChange={(e) => setToday(e.target.value)}
				>
					{Object.keys(available).map((day) => (
						<option value={day} key={day}>
							{day}
						</option>
					))}
				</select>
			</div>
			<div>
				<select
					className="select-input"
					value={hour}
					onChange={(e) => setHour(e.target.value)}
				>
					{hourList.map((hour) => (
						<option value={hour} key={hour}>
							{hour}
						</option>
					))}
				</select>
			</div>

			<button className="btn btn-w" onClick={() => setShowSelectDate(false)}>
				<div className="btn-desc">
					{appointment.toDateString()} at {appointment.toLocaleTimeString()}
				</div>
				<div>Request this time</div>
			</button>
			<img className="tour-img" src={property?.front_img} alt="Property" />
		</>
	);
};

export default SelectDate;
