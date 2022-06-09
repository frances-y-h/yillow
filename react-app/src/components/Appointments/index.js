import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import User from "./User";

import * as appointmentActions from "../../store/appointment";

const Appointments = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);

	useEffect(() => {
		dispatch(appointmentActions.getAllAppointments());
	}, [dispatch]);

	if (user.agent) {
		return <div>Agent Appointments</div>;
	} else {
		return <User />;
	}
};

export default Appointments;
