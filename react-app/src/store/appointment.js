// Actions
const GET_APPOINTMENTS = "appointments/GET_APPOINTMENTS";
const ADD_EDIT_APPOINTMENT = "appointments/ADD_EDIT_APPOINTMENT";
const DELETE_APPOINTMENT = "appointments/DELETE_APPOINTMENT";

// Action Creators
const getAppointments = (appointments) => {
	return {
		type: GET_APPOINTMENTS,
		appointments,
	};
};

const addEditAppointment = (appointment) => {
	return {
		type: ADD_EDIT_APPOINTMENT,
		appointment,
	};
};

const deleteAppointment = (appointmentId) => {
	return {
		type: DELETE_APPOINTMENT,
		appointmentId,
	};
};

// Thunks
export const getAllAppointments = () => async (dispatch) => {
	const response = await fetch("/api/appointments/");
	if (response.ok) {
		const data = await response.json();
		dispatch(getAppointments(data.appointments));
		return data;
	} else {
		return { errors: ["Something went wrong. Please try again"] };
	}
};

export const addAppointment = (appointment) => async (dispatch) => {
	const response = await fetch("/api/appointments/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(appointment),
	});
	const data = await response.json();
	if (response.ok) {
		if (data.errors) {
			return data;
		}
		dispatch(addEditAppointment(data.appointment));
		return data.appointment;
	} else if (response.status < 500) {
		return data;
	} else {
		return { errors: ["Something went wrong. Please try again"] };
	}
};

export const editAppointment = (appointment) => async (dispatch) => {
	const response = await fetch(`/api/appointments/${appointment.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(appointment),
	});
	const data = await response.json();
	if (response.ok) {
		if (data.errors) {
			return data;
		}
		dispatch(addEditAppointment(data.appointment));
		return data;
	} else if (response.status < 500) {
		return data;
	} else {
		return { errors: ["Something went wrong. Please try again"] };
	}
};

export const deleteThisAppointment = (appointmentId) => async (dispatch) => {
	const response = await fetch(`/api/appointments/${appointmentId}`, {
		method: "DELETE",
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return data;
		}
		dispatch(deleteAppointment(appointmentId));
		return data;
	} else {
		return { errors: ["Something went wrong. Please try again"] };
	}
};

// Reducers
const initialState = { appointments: null };

export default function reducer(state = initialState, action) {
	let newState;
	switch (action.type) {
		case GET_APPOINTMENTS:
			newState = {};
			action.appointments.forEach((appt) => {
				newState[appt.id] = appt;
			});
			return newState;
		case ADD_EDIT_APPOINTMENT:
			newState = JSON.parse(JSON.stringify(state));
			newState[action.appointment.id] = action.appointment;
			return newState;
		case DELETE_APPOINTMENT:
			newState = JSON.parse(JSON.stringify(state));
			delete newState[action.appointmentId];
			return newState;
		default:
			return state;
	}
}
