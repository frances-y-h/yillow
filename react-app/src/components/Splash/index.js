import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

import logo from "../../assets/logo-blue.svg";
import footer from "../../assets/footer-art.svg";

const Splash = () => {
	const history = useHistory();

	const [search, setSearch] = useState("");
	const [searchList, setSearchList] = useState([]);
	const [searchFiltered, setSearchFiltered] = useState([]);
	const [errors, setErrors] = useState([]);

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
									onMouseDown={() => setSearch(term)}
								>
									<i className="fa-solid fa-magnifying-glass"></i>
									<div className="term">{term}</div>
								</div>
							))}
						</div>
					</label>
					{errors && (
						<div className="error-list">
							{errors.map((err) => (
								<div key={err}>{err}</div>
							))}
						</div>
					)}
				</form>
			</main>
			<footer className="footer-ctrl">
				<div className="footer-tech">Techonologies used</div>
				<div className="footer-logo-wrap">
					<img className="footer-logo" src={logo} alt="Yillow" /> © 2006-2022
					Frances (Huang) Lau
				</div>

				<img src={footer} alt="Footer" />
			</footer>
		</>
	);
};

export default Splash;
