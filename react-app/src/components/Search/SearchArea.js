import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import List from "./List";
import AreaMap from "./Map/AreaMap";

import * as propertyActions from "../../store/property";

const SearchArea = () => {
	const dispatch = useDispatch();
	// param format /neLat=34.03411175190029&neLng=-117.58240595947267&swLat=33.91424721998569&swLng=-117.82341853271485
	const { areaParam } = useParams();

	const properties = useSelector((state) => state.properties);

	const [min, setMin] = useState(0);
	const [max, setMax] = useState(99999999999);
	const [type, setType] = useState("");
	const [bed, setBed] = useState(0);
	const [bath, setBath] = useState(0);
	const [center, setCenter] = useState({ lat: 37.0903, lon: 95.7129 });
	const [propArr, setPropArr] = useState([]);
	const [over, setOver] = useState({ id: 0 });
	const [zoom, setZoom] = useState(10);

	useEffect(() => {
		if (areaParam) {
			const [neLat, neLng, swLat, swLng, zoom] = areaParam
				.split("&")
				.map((each) => each.split("=")[1]);

			const payload = { neLat, neLng, swLat, swLng };
			dispatch(propertyActions.areaProperties(payload));
			setZoom(parseInt(zoom), 10);
		}
	}, [dispatch, areaParam]);

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

	useEffect(() => {
		if (propArr.length) {
			const latArr = propArr.map((prop) => prop.lat);
			const lngArr = propArr.map((prop) => prop.lng);
			const centerLat = latArr.reduce((acc, el) => acc + el) / latArr.length;
			const centerLng = lngArr.reduce((acc, el) => acc + el) / lngArr.length;
			setCenter({ lat: centerLat, lng: centerLng });
		} else setCenter({ lat: 39.5, lng: -98.35 });
	}, [propArr]);

	return (
		<main className="search-pg-ctrl">
			<AreaMap
				isMarkerShown
				googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCV1aH4qqDr2uUEG4I9FKeB6scau4FWuWw&v=3.exp&libraries=geometry,drawing,places"
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div className="map-ctnr" />}
				mapElement={<div style={{ height: `100%` }} />}
				markers={propArr}
				center={center}
				over={over}
				zoom={zoom}
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
				setOver={setOver}
			/>
		</main>
	);
};

export default SearchArea;
