// Actions
const GET_CHANNELS = "channels/GET_CHANNELS";
const ADD_CHANNEL = "channels/ADD_CHANNEL";
const ADD_CHAT = "channels/ADD_CHAT";
const DELETE_CHAT = "channels/DELETE_CHAT";

// Action Creator
export const getChannels = (channels) => {
	return {
		type: GET_CHANNELS,
		channels,
	};
};

const addChannel = (channel) => {
	return {
		type: ADD_CHANNEL,
		channel,
	};
};

export const addChat = (payload) => {
	return {
		type: ADD_CHAT,
		payload,
	};
};

export const deleteChat = (payload) => {
	return {
		type: DELETE_CHAT,
		payload,
	};
};

// Thunks
export const addThisChannel = (channel) => async (dispatch) => {
	const response = await fetch("/api/channels/", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(channel),
	});
	const data = await response.json();
	if (response.ok) {
		if (data.errors) {
			return data;
		}
		dispatch(addChannel(data.channel));
		return data.channel;
	} else if (response.status < 500) {
		return data;
	} else {
		return { errors: ["Something went wrong. Please try again"] };
	}
};

// Reducers
const initialState = { channels: null };

export default function reducer(state = initialState, action) {
	let newState;
	switch (action.type) {
		case GET_CHANNELS:
			newState = {};
			action.channels.forEach((channel) => {
				newState[channel.id] = channel;
			});
			return newState;
		case ADD_CHANNEL:
			newState = JSON.parse(JSON.stringify(state));
			newState[action.channel.id] = action.channel;
			return newState;
		case ADD_CHAT:
			newState = JSON.parse(JSON.stringify(state));
			newState[action.payload.channel_id].chat_ids.push(action.payload.chat_id);
			return newState;
		case DELETE_CHAT:
			newState = JSON.parse(JSON.stringify(state));
			newState[action.payload.channel_id].chat_ids = newState[
				action.payload.channel_id
			].chat_ids.filter((id) => id !== action.payload.chat_id);
			return newState;
		default:
			return state;
	}
}
