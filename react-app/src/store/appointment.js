// Actions
const GET_APPOINTMENTS = "appointments/GET_APPOINTMENTS";
const ADD_EDIT_APPOINTMENT = "appointments/ADD_EDIT_APPOINTMENT";

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

// Thunks
export const getAllAppointments = () => async (dispatch) => {
	const response = await fetch("/api/appointments/");
	if (response.ok) {
		const data = await response.json();
		dispatch(getAppointments(data.appointments));
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
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return data;
		}
		dispatch(addEditAppointment(data.appointment));
		return data.appointment;
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
		default:
			return state;
	}
}
