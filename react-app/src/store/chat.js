// Action
const GET_CHATS = "chats/GET_CHATS";

// Action Creator
export const getChats = (chats) => {
	return {
		type: GET_CHATS,
		chats,
	};
};

// Thunks

// Reducers
const initialState = { chats: null };

export default function reducer(state = initialState, action) {
	let newState;
	switch (action.type) {
		case GET_CHATS:
			newState = {};
			action.chats.forEach((chat) => {
				newState[chat.id] = chat;
			});
			return newState;
		default:
			return state;
	}
}
