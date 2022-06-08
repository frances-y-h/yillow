import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import logo from "../../assets/logo-blue.svg";
import footer from "../../assets/footer-art.svg";

import * as propertyActions from "../../store/property";

const Splash = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const [search, setSearch] = useState("");
	const [errors, setErrors] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (search.length > 2) {
			history.push(`/search/${search}`);
		} else {
			setErrors(["Please enter 3 characters or more"]);
		}
	};

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
						/>
						<i
							className="fa-solid fa-magnifying-glass"
							onClick={handleSubmit}
						></i>
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
