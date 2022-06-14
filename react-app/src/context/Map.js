import { useState, useContext, createContext } from "react";

export const MapContext = createContext();
export const useMap = () => useContext(MapContext);

export default function MapProvider({ children }) {
	const [url, setUrl] = useState("");

	return (
		<MapContext.Provider
			value={{
				url,
				setUrl,
			}}
		>
			{children}
		</MapContext.Provider>
	);
}
