// Actions
const GET_PROPERTIES = "properties/SEARCH_PROPERTIES";

// Action Creators
const getProperties = (properties) => {
	return {
		type: GET_PROPERTIES,
		properties,
	};
};

// Thunks
export const searchProperties = (search) => async (dispatch) => {
	const response = await fetch("/api/properties/search", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ search }),
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(getProperties(data.properties));
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

// Reducer
const initialState = { properties: null };

export default function reducer(state = initialState, action) {
	let newState;
	switch (action.type) {
		case GET_PROPERTIES:
			newState = {};
			action.properties.forEach((property) => {
				newState[property.id] = property;
			});
			return newState;
		default:
			return state;
	}
}
