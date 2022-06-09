import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../../../store/session";

const LoginAppointment = ({ email, setEmail }) => {
	const dispatch = useDispatch();

	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const data = await dispatch(login(email, password));
		if (data) {
			setErrors(data);
		}
	};

	return (
		<>
			<label className="label" htmlFor="email">
				<div>
					Email <span className="input-error">Required *</span>
				</div>
				<input
					type="email"
					name="email"
					value={email}
					placeholder="Enter Email"
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
			</label>
			<label htmlFor="password" className="label">
				<div>
					Password <span className="input-error">Required *</span>
				</div>
				<input
					name="password"
					type="password"
					placeholder="Enter Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
			</label>
			<div className="error-list error-ctr">
				{errors.map((error, ind) => (
					<div key={ind}>{error}</div>
				))}
			</div>
			<button className="btn btn-w" type="submit" onClick={handleSubmit}>
				Sign in first
			</button>
		</>
	);
};

export default LoginAppointment;
