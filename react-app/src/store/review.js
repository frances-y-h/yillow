// Actions
const ADD_EDIT_REVIEW = "reviews/ADD_EDIT_REVIEW";

// Action Creator
const addEditReview = (review) => {
	return {
		type: ADD_EDIT_REVIEW,
		review,
	};
};

// Thunks
export const addNewReview = (review) => async (dispatch) => {
	const response = await fetch("/api/reviews/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(review),
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return data;
		}
		dispatch(addEditReview(data.review));
		return data.review;
	} else {
		return { errors: ["Something went wrong. Please try again"] };
	}
};

// Reducers
const initialState = { reviews: null };
export default function reducer(state = initialState, action) {
	let newState;
	switch (action.type) {
		case ADD_EDIT_REVIEW:
			newState = JSON.parse(JSON.stringify(state));
			newState[action.review.id] = action.review;
			return newState;
		default:
			return state;
	}
}
