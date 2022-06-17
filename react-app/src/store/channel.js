// Actions
const GET_CHANNELS = "channels/GET_CHANNELS";

// Action Creator
export const getChannels = (channels) => {
	return {
		type: GET_CHANNELS,
		channels,
	};
};

// Thunks

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
		default:
			return state;
	}
}
