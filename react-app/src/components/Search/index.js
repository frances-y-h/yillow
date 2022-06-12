import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import List from "./List";

import * as propertyActions from "../../store/property";

const Search = () => {
	const dispatch = useDispatch();
	const searchParam = useParams().searchParam;

	useEffect(() => {
		if (searchParam) {
			dispatch(propertyActions.searchProperties(searchParam));
		}
	}, [dispatch, searchParam]);

	return (
		<main className="search-pg-ctrl">
			{/* <div>Map</div> */}
			<List />
		</main>
	);
};
export default Search;
