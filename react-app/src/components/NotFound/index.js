import { useHistory } from "react-router-dom";

import cat from "../../assets/notFound/cat.svg";
import Footer from "../Splash/Footer";

const NotFound = () => {
	const history = useHistory();

	return (
		<>
			<div className="not-found-ctrl">
				<div className="title">Uh oh,</div>
				<div className="title">something broke.</div>
				<div className="error">Error 404 - page not found.</div>
				<div>
					<button className="btn" onClick={() => history.push("/")}>
						Return to Zillow
					</button>
				</div>
				<img className="cat" src={cat} alt="Cat" />
			</div>
			<Footer />
		</>
	);
};

export default NotFound;
