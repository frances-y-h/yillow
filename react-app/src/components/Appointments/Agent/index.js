import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";

import MyMap from "./Map";
import AgentCalendar from "./Calendar";

const Agent = () => {
	const appointments = useSelector((state) => state.appointments);
	const [over, setOver] = useState();

	return (
		<div className="appointment-ctrl">
			<div></div>
			{/* <MyMap
				isMarkerShown
				googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCV1aH4qqDr2uUEG4I9FKeB6scau4FWuWw&v=3.exp&libraries=geometry,drawing,places"
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div className="map-ctnr" />}
				mapElement={<div style={{ height: `100%` }} />}
			/> */}
			<AgentCalendar setOver={setOver} />
		</div>
	);
};

export default Agent;
