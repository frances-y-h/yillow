import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import editAvailable from "../../../Tools/EditAvailable";
import Agent from "./Agent";

const ApptDetail = ({ appt, past }) => {
	const properties = useSelector((state) => state.properties);
	const agents = useSelector((state) => state.agents);
	const [today, setToday] = useState("");
	const [hour, setHour] = useState("");
	const [message, setMessage] = useState("");
	const [hourList, setHourList] = useState([]);

	const property = properties[appt?.property_id];
	const agent = agents[appt?.agent_id];

	const schedule = editAvailable(property, appt.date, appt.time);

	useEffect(() => {
		setToday(appt.date);
		setHour(appt.time);
		setMessage(appt.message);
	}, []);

	useEffect(() => {
		setHourList(schedule[today]);
	}, [today]);

	return (
		<div className="appt-detail-modal">
			{property?.front_img ? (
				<div
					className="appt-img-detail"
					style={{ backgroundImage: `url("${property.front_img}")` }}
				>
					Top image
				</div>
			) : (
				<div className="appt-img-detail">No image available</div>
			)}
			<div className="appt-modal-btm">
				<div className="appt-address-wrap">
					<div className="appt-label">Address</div>
					<div className="appt-address">
						{property?.st_num} {property?.st_name}, {property?.city},{" "}
						{property?.state}, {property?.zip}
					</div>
				</div>
				<div>
					<div className="appt-label">Appointment Time</div>
					<div className="appt-time-wrap">
						<select
							className="appt-input"
							value={today}
							onChange={(e) => setToday(e.target.value)}
							disabled={past}
						>
							{Object.keys(schedule).map((day) => (
								<option value={day} key={day}>
									{day}
								</option>
							))}
						</select>
						<select
							className="appt-input"
							value={hour}
							onChange={(e) => setHour(e.target.value)}
						>
							{hourList?.map((hour) => (
								<option value={hour} key={hour}>
									{hour}
								</option>
							))}
						</select>
					</div>
				</div>
				<label className="label">
					Message
					<textarea
						className="appt-input"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					/>
				</label>
				<Agent agent={agent} />
				<button>
					<div>Update Appointment to</div>
					<div>
						{today} {hour}
					</div>
				</button>
				<div>
					<button>Cancel Appointment</button>
					<button>Undo Changes</button>
				</div>
			</div>
		</div>
	);
};

export default ApptDetail;
