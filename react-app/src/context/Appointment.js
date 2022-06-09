import { useState, useContext, createContext } from "react";

export const AppointmentContext = createContext();
export const useAppointment = () => useContext(AppointmentContext);

export default function AppointmentProvider({ children }) {
	const [today, setToday] = useState("");
	const [hour, setHour] = useState();

	return (
		<AppointmentContext.Provider
			value={{
				today,
				setToday,
				hour,
				setHour,
			}}
		>
			{children}
		</AppointmentContext.Provider>
	);
}
