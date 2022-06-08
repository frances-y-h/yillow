// Actions
const GET_AGENTS = "agents/GET_AGENTS";

// Action Creator
export const getAgents = (agents) => {
	return {
		type: GET_AGENTS,
		agents,
	};
};

// Reducer
const initialState = { agents: null };
export default function reducer(state = initialState, action) {
	let newState;
	switch (action.type) {
		case GET_AGENTS:
			newState = {};
			action.agents.forEach((agent) => {
				newState[agent.id] = agent;
			});
			return newState;
		default:
			return state;
	}
}
