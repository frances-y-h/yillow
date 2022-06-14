import logo from "../../assets/logo-blue.svg";
import footer from "../../assets/footer-art.svg";

const Footer = () => {
	return (
		<footer className="footer-ctrl">
			<div className="footer-tech">
				<a href="https://reactjs.org/" target="_blank" rel="noreferrer">
					React JS
				</a>
				<a href="https://redux.js.org/" target="_blank" rel="noreferrer">
					Redux
				</a>
				<a href="https://www.docker.com/" target="_blank" rel="noreferrer">
					Docker
				</a>
				<a href="https://www.python.org/" target="_blank" rel="noreferrer">
					Python
				</a>
				<a
					href="https://flask.palletsprojects.com/en/2.1.x/"
					target="_blank"
					rel="noreferrer"
				>
					Flask
				</a>
				<a href="https://www.postgresql.org/" target="_blank" rel="noreferrer">
					Postgres SQL
				</a>
				<a href="https://www.sqlalchemy.org/" target="_blank" rel="noreferrer">
					SQL Alchemy
				</a>
				<a
					href="https://alembic.sqlalchemy.org/en/latest/"
					target="_blank"
					rel="noreferrer"
				>
					Alembic
				</a>
			</div>
			<div className="footer-logo-wrap">
				<img className="footer-logo" src={logo} alt="Yillow" /> © 2006-2022
				Frances (Huang) Lau
			</div>

			<img src={footer} alt="Footer" />
		</footer>
	);
};

export default Footer;
