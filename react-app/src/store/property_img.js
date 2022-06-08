// Actions
const GET_IMAGES = "property_imgs/GET_IMAGES";

// Action Creators
const getImages = (images) => {
	return {
		type: GET_IMAGES,
		images,
	};
};

// Thunks
export const getAllImages = (propertyId) => async (dispatch) => {
	const response = await fetch(`/api/properties/${propertyId}/images`);
	if (response.ok) {
		const data = await response.json();
		dispatch(getImages(data.images));
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
const initialState = { images: null };

export default function reducer(state = initialState, action) {
	let newState;
	switch (action.type) {
		case GET_IMAGES:
			newState = {};
			action.images.forEach((image) => {
				newState[image.id] = image;
			});
			return newState;
		default:
			return state;
	}
}
