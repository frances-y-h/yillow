// Action
const GET_CHATS = "chats/GET_CHATS";
const ADD_EDIT_CHAT = "chats/ADD_EDIT_CHAT";

// Action Creator
export const getChats = (chats) => {
	return {
		type: GET_CHATS,
		chats,
	};
};

export const addEditChat = (chat) => {
	return {
		type: ADD_EDIT_CHAT,
		chat,
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
		case ADD_EDIT_CHAT:
			newState = JSON.parse(JSON.stringify(state));
			newState[action.chat.id] = action.chat;
			return newState;
		default:
			return state;
	}
}
