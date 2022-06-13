import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import List from "./List";
import MyMap from "./Map";

import * as propertyActions from "../../store/property";

const Search = () => {
	const dispatch = useDispatch();
	const searchParam = useParams().searchParam;
	const properties = useSelector((state) => state.properties);

	const [min, setMin] = useState(0);
	const [max, setMax] = useState(99999999999);
	const [type, setType] = useState("");
	const [bed, setBed] = useState(0);
	const [bath, setBath] = useState(0);

	const [propArr, setPropArr] = useState([]);

	useEffect(() => {
		dispatch(propertyActions.searchProperties(searchParam));
	}, [dispatch, searchParam]);

	useEffect(() => {
		let arr = Object.values(properties)
			.filter((prop) => prop?.price > min)
			.filter((prop) => prop?.price < max)
			.filter((prop) => prop?.type.includes(type))
			.filter((prop) => {
				if (bed === 0) {
					return prop;
				} else if (bed === 4) {
					return prop?.bed >= 4;
				} else {
					return prop?.bed === bed;
				}
			})
			.filter((prop) => {
				if (bath === 0) {
					return prop;
				} else if (bath === 4) {
					return prop?.bath >= 4;
				} else {
					return prop?.bath === bath || prop?.bath - 0.5 === bath;
				}
			});
		setPropArr(arr);
	}, [min, max, type, bed, bath, properties]);

	return (
		<main className="search-pg-ctrl">
			<MyMap
				isMarkerShown
				googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCV1aH4qqDr2uUEG4I9FKeB6scau4FWuWw&v=3.exp&libraries=geometry,drawing,places"
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div className="map-ctnr" />}
				mapElement={<div style={{ height: `100%` }} />}
				markers={propArr}
			/>
			<List
				min={min}
				setMin={setMin}
				max={max}
				setMax={setMax}
				type={type}
				setType={setType}
				bed={bed}
				setBed={setBed}
				bath={bath}
				setBath={setBath}
				propArr={propArr}
			/>
		</main>
	);
};
export default Search;
