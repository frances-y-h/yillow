import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import PropertyCard from "./PropertyCard";

import noproperty from "../../../assets/no-property-nobg.svg";

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

	const [propArr, setPropArr] = useState([]);

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
	}, [min, max, type, bed, bath, search, properties]);

	return (
		<div className="search-wrap">
			<div className="search-bar-wrap">
				<form className="search-bar" onSubmit={handleSubmit}>
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
				<div className="search-bar">
					<div classname="filters">Filters</div>
					<div className="wrap">
						Price
						<label className="sh-label">
							Min
							<select
								value={min}
								onChange={(e) => setMin(parseInt(e.target.value, 10))}
							>
								<option value="0">$0+</option>
								<option value="100000">$100,000+</option>
								<option value="200000">$200,000+</option>
								<option value="300000">$300,000+</option>
								<option value="400000">$400,000+</option>
								<option value="500000">$500,000+</option>
								<option value="600000">$600,000+</option>
								<option value="700000">$700,000+</option>
								<option value="800000">$800,000+</option>
								<option value="900000">$900,000+</option>
							</select>
						</label>
						<label className="sh-label">
							Max
							<select
								value={max}
								onChange={(e) => setMax(parseInt(e.target.value, 10))}
							>
								<option value="500000">$500,000+</option>
								<option value="600000">$600,000+</option>
								<option value="700000">$700,000+</option>
								<option value="800000">$800,000+</option>
								<option value="900000">$900,000+</option>
								<option value="1000000">$1M</option>
								<option value="1250000">$1.25M</option>
								<option value="1500000">$1.5M</option>
								<option value="1750000">$1.75M</option>
								<option value="99999999999">Any Price</option>
							</select>
						</label>
					</div>
					<div className="wrap">
						<label className="sh-label">
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
					</div>
					<div className="wrap">
						<label className="sh-label">
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
					</div>
					<div className="wrap">
						<label className="sh-label">
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
				</div>
			</div>
			{propArr.length ? (
				<div className="search-list">
					{propArr?.map((property, idx) => (
						<PropertyCard key={"property" + idx} property={property} />
					))}
				</div>
			) : (
				<div className="search-no-results">
					<img className="img" src={noproperty} alt="No property" />
					<div className="title">Sorry no results are found</div>
					<div className="desc">
						Please search different city or filter with different criteria
					</div>
				</div>
			)}
		</div>
	);
};

export default List;
