import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

import Footer from "./Footer";

const Splash = () => {
	const history = useHistory();

	const [search, setSearch] = useState("");
	const [searchList, setSearchList] = useState([]);
	const [searchFiltered, setSearchFiltered] = useState([]);

	const searchDivRef = useRef();
	const searchDDRef = useRef();

	const directSearch = (term) => {
		const searchTerm = term.split(" ").join("-");
		history.push(`/search/${searchTerm}`);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const searchTerm = search.split(" ").join("-");
		history.push(`/search/${searchTerm}`);
	};

	useEffect(() => {
		fetch("/api/search/terms")
			.then((res) => res.json())
			.then((res) => setSearchList(res.terms))
			.catch((err) => console.log(err));
	}, []);

	useEffect(() => {
		const filtered = searchList.filter((term) =>
			term.toLowerCase().includes(search.toLowerCase())
		);
		setSearchFiltered(filtered);
	}, [search, searchList]);

	return (
		<>
			<main className="splash-ctrl">
				<form className="splash-search-wrap" onSubmit={handleSubmit}>
					<div className="splash-search-title">Find it. Tour it. Own it.</div>
					<label className="search-label">
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
						<div className="search-dd" ref={searchDDRef}>
							{searchFiltered.map((term) => (
								<div
									className="div"
									key={term}
									onMouseDown={(e) => {
										setSearch(term);
										directSearch(term);
									}}
								>
									<i className="fa-solid fa-magnifying-glass"></i>
									<div className="term">{term}</div>
								</div>
							))}
						</div>
					</label>
				</form>
			</main>
			<Footer />
		</>
	);
};

export default Splash;
