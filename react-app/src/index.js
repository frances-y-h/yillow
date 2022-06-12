import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import configureStore from "./store";
import { ModalProvider } from "./context/Modal";
import NotificationProvider from "./context/Notification";

const store = configureStore();

ReactDOM.render(
	<React.Fragment>
		<Provider store={store}>
			<NotificationProvider>
				<ModalProvider>
					<App />
				</ModalProvider>
			</NotificationProvider>
		</Provider>
	</React.Fragment>,
	document.getElementById("root")
);
