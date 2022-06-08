// Actions

const ADD_EDIT_APPOINTMENT = "appointments/ADD_EDIT_APPOINTMENT";

// Action Creators
const addEditAppointment = (appointment) => {
	return {
		type: ADD_EDIT_APPOINTMENT,
		appointment,
	};
};

// Thunks
export const addAppointment = (appointment) => async (dispatch) => {
	const response = await fetch("/api/appointments/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(appointment),
	});
	const data = await response.json();
	return data;
	// if (response.ok) {
	// 	const data = await response.json();
	// 	if (data.errors) {
	// 		return data;
	// 	}
	// } else {
	// 	return { errors: ["Something went wrong. Please try again"] };
	// }
};

// Reducers
const initialState = { appointments: null };

export default function reducer(state = initialState, action) {
	let newState;
	switch (action.type) {
		case ADD_EDIT_APPOINTMENT:
			newState = JSON.parse(JSON.stringify(state));
			newState[action.appointment.id] = action.appointment;
			return newState;
		default:
			return state;
	}
}
