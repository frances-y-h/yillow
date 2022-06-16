import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";

import AgentCalendar from "./Calendar";

const Agent = () => {
	const appointments = useSelector((state) => state.appointments);

	return (
		<div className="appointment-ctrl">
			<div>Google Map</div>
			<AgentCalendar />
		</div>
	);
};

export default Agent;
