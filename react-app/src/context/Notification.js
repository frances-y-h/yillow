import { useState, useContext, createContext } from "react";

export const NotificationContext = createContext();
export const useNotification = () => useContext(NotificationContext);

export default function NotificationProvider({ children }) {
	const [toggleNotification, setToggleNotification] =
		useState("notification-move");
	const [notificationMsg, setNotificationMsg] = useState("");

	return (
		<NotificationContext.Provider
			value={{
				toggleNotification,
				setToggleNotification,
				notificationMsg,
				setNotificationMsg,
			}}
		>
			{children}
		</NotificationContext.Provider>
	);
}
