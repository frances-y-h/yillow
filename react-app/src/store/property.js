// Actions
const GET_PROPERTIES = "properties/SEARCH_PROPERTIES";
const GET_PROPERTY = "properties/GET_PROPERTY";

// Action Creators
export const getProperties = (properties) => {
	return {
		type: GET_PROPERTIES,
		properties,
	};
};

const getProperty = (property) => {
	return {
		type: GET_PROPERTY,
		property,
	};
};

// Thunks
export const searchProperties = (term) => async (dispatch) => {
	const response = await fetch(`/api/search/${term}`);
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

export const getThisProperty = (property_id) => async (dispatch) => {
	const response = await fetch(`/api/properties/${property_id}`);
	if (response.ok) {
		const data = await response.json();
		dispatch(getProperty(data.property));
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
		case GET_PROPERTY:
			newState = JSON.parse(JSON.stringify(state));
			newState[action.property.id] = action.property;
			return newState;
		default:
			return state;
	}
}
