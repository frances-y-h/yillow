import { useSelector } from "react-redux";

import PropertyCard from "./PropertyCard";

const List = () => {
	const properties = useSelector((state) => state.properties);

	return (
		<div className="search-list">
			{Object.values(properties)?.map((property, idx) => (
				<PropertyCard key={"property" + idx} property={property} />
			))}
		</div>
	);
};

export default List;
