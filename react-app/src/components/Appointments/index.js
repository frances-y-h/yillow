import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import User from "./User.js";

import * as appointmentActions from "../../store/appointment";
import * as propertyActions from "../../store/property";
import * as agentActions from "../../store/agent";

const Appointments = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);

	useEffect(() => {
		dispatch(appointmentActions.getAllAppointments())
			.then((data) => {
				dispatch(propertyActions.getProperties(data.properties));
				if (!user.agent) {
					dispatch(agentActions.getAgents(data.agents));
				}
			})
			.catch((error) => console.log(error));
	}, [dispatch]);

	return <User />;
};

export default Appointments;
