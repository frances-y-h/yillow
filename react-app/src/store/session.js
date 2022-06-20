// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const UPDATE_USER = "session/UPDATE_USER";
const UPLOAD_PHOTO = "session/UPLOAD_PHOTO";

// Action Creator
const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

export const updateUser = (user) => ({
	type: UPDATE_USER,
	payload: user,
});

export const uploadPhoto = (url) => ({
	type: UPLOAD_PHOTO,
	url,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

// Thunks
export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp =
	(username, email, password, agent) => async (dispatch) => {
		const response = await fetch("/api/auth/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username,
				email,
				password,
				agent,
			}),
		});

		if (response.ok) {
			const data = await response.json();
			dispatch(setUser(data));
			return null;
		} else if (response.status < 500) {
			const data = await response.json();
			if (data.errors) {
				return data.errors;
			}
		} else {
			return ["An error occurred. Please try again."];
		}
	};

export const updateThisUser = (user) => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(updateUser(data.user));
		return data;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data;
		}
	} else {
		return { errors: ["An error occurred. Please try again."] };
	}
};

export const addServiceArea = (zip) => async (dispatch) => {
	const response = await fetch("/api/service_areas/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(zip),
	});
	const data = await response.json();
	if (response.ok) {
		dispatch(updateUser(data.user));
		return data;
	} else if (response.status < 500) {
		if (data.errors) {
			return data;
		}
	} else {
		return { errors: ["An error occurred. Please try again."] };
	}
};

export const removeServiceArea = (zip) => async (dispatch) => {
	const response = await fetch(`/api/service_areas/${zip}`, {
		method: "DELETE",
	});
	const data = await response.json();
	if (response.ok) {
		dispatch(updateUser(data.user));
		return data;
	} else if (response.status < 500) {
		if (data.errors) {
			return data;
		}
	} else {
		return { errors: ["An error occurred. Please try again."] };
	}
};

// Reducer
const initialState = { user: null };

export default function reducer(state = initialState, action) {
	let newState;
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case UPDATE_USER:
			newState = JSON.parse(JSON.stringify(state));
			newState.user = { ...newState.user, ...action.payload };
			return newState;
		case UPLOAD_PHOTO:
			newState = JSON.parse(JSON.stringify(state));
			newState.user = { ...newState.user, photo: action.url.url };
			return newState;
		case REMOVE_USER:
			return { user: null };
		default:
			return state;
	}
}
