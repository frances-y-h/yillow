import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from "./session";
import properties from "./property";
import images from "./property_img";
import agents from "./agent";
import appointments from "./appointment";
import reviews from "./review";
import channels from "./channel";
import chats from "./chat";

const rootReducer = combineReducers({
	session,
	properties,
	agents,
	images,
	appointments,
	reviews,
	channels,
	chats,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
	enhancer = applyMiddleware(thunk);
} else {
	const logger = require("redux-logger").default;
	const composeEnhancers =
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
	return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
