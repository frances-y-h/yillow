import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import PropertyCard from "./PropertyCard";

const List = () => {
	const history = useHistory();
	const properties = useSelector((state) => state.properties);
	const searchParam = useParams().searchParam;

	const [search, setSearch] = useState("");
	const [searchList, setSearchList] = useState([]);
	const [searchFiltered, setSearchFiltered] = useState([]);
	const [errors, setErrors] = useState([]);
	const [min, setMin] = useState(0);
	const [max, setMax] = useState(99999999999);
	const [type, setType] = useState("");
	const [bed, setBed] = useState(0);
	const [bath, setBath] = useState(0);

	const searchDivRef = useRef();
	const searchDDRef = useRef();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (search.length > 2) {
			const searchTerm = search.split(" ").join("-");
			history.push(`/search/${searchTerm}`);
		} else {
			setErrors(["Please enter 3 characters or more"]);
		}
	};

	useEffect(() => {
		fetch("/api/search/terms")
			.then((res) => res.json())
			.then((res) => setSearchList(res.terms))
			.catch((err) => console.log(err));

		const param = searchParam.split("-").join(" ");
		setSearch(param);
	}, []);

	useEffect(() => {
		const filtered = searchList.filter((term) =>
			term.toLowerCase().includes(search.toLowerCase())
		);
		setSearchFiltered(filtered);
	}, [search, searchList]);

	useEffect(() => {
		if (search.length > 2) {
			setErrors([]);
		}
	}, [search]);

	return (
		<div className="search-wrap">
			<div className="search-bar">
				<form onSubmit={handleSubmit}>
					<label className="search-label-sm">
						<input
							type="text"
							className="search-input"
							placeholder="Enter an address, city, or ZIP code"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							ref={searchDivRef}
						/>
						<i
							className="fa-solid fa-magnifying-glass"
							onClick={handleSubmit}
						></i>
						<div className="search-dd search-dd-sm" ref={searchDDRef}>
							{searchFiltered.map((term) => (
								<div
									className="div"
									key={term}
									onMouseDown={(e) => setSearch(term)}
								>
									<i className="fa-solid fa-magnifying-glass"></i>
									<div className="term">{term}</div>
								</div>
							))}
						</div>
					</label>
				</form>
				<div>
					Price
					<label>
						Min
						<select
							value={min}
							onChange={(e) => setMin(parseInt(e.target.value, 10))}
						>
							<option value="0">$0+</option>
							<option value="1000000">$100,000+</option>
							<option value="2000000">$200,000+</option>
							<option value="3000000">$300,000+</option>
							<option value="4000000">$400,000+</option>
							<option value="5000000">$500,000+</option>
							<option value="6000000">$600,000+</option>
							<option value="7000000">$700,000+</option>
							<option value="8000000">$800,000+</option>
							<option value="9000000">$900,000+</option>
						</select>
					</label>
					<label>
						Max
						<select
							value={max}
							onChange={(e) => setMax(parseInt(e.target.value, 10))}
						>
							<option value="5000000">$500,000+</option>
							<option value="6000000">$600,000+</option>
							<option value="7000000">$700,000+</option>
							<option value="8000000">$800,000+</option>
							<option value="9000000">$900,000+</option>
							<option value="10000000">$1M</option>
							<option value="12500000">$1.25M</option>
							<option value="15000000">$1.5M</option>
							<option value="17500000">$1.75M</option>
							<option value="99999999999">Any Price</option>
						</select>
					</label>
				</div>
				<label>
					Home type
					<select value={type} onChange={(e) => setType(e.target.value)}>
						<option value="">All</option>
						<option value="Single Family">Single Family</option>
						<option value="Condominium">Condominium</option>
						<option value="Townhouse">Townhouse</option>
						<option value="Manufactured Home">Manufactured Home</option>
						<option value="Cabin">Cabin</option>
					</select>
				</label>

				<label>
					Bed
					<select
						value={bed}
						onChange={(e) => setBed(parseInt(e.target.value, 10))}
					>
						<option value="0">Any</option>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4+</option>
					</select>
				</label>
				<label>
					Bath
					<select
						value={bath}
						onChange={(e) => setBath(parseInt(e.target.value, 10))}
					>
						<option value="0">Any</option>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4+</option>
					</select>
				</label>
			</div>
			<div className="search-list">
				{properties ? (
					Object.values(properties)?.map((property, idx) => (
						<PropertyCard key={"property" + idx} property={property} />
					))
				) : (
					<div>No results</div>
				)}
			</div>
		</div>
	);
};

export default List;
