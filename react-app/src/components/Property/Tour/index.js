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

		const appointments = [];
		property.appointments.forEach((appt) => {
			appointments.push(new Date(appt).getTime());
		});

		const tour = {};

		for (let i = 1; i < 9; i++) {
			let month = today.addDays(i).getMonth();
			let day = today.addDays(i).getDate();
			let year = today.addDays(i).getFullYear();
			let date = `${year}-${month + 1}-${day}`;
			const hours = [];
			for (let h = 9; h < 19; h += 0.5) {
				let hour;
				if (h % 1 === 0.5) {
					hour = `${Math.floor(h)}:30`;
				} else {
					hour = `${h}:00`;
				}
				let appt = new Date(`${date} ${hour}`);
				if (!appointments.includes(appt.getTime())) {
					hours.push(hour);
				}
			}
			tour[date] = hours;
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
