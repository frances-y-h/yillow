import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";

const LoginForm = () => {
	const [errors, setErrors] = useState([]);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	const onLogin = async (e) => {
		e.preventDefault();
		const data = await dispatch(login(email, password));
		if (data) {
			setErrors(data);
		}
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	if (user) {
		return <Redirect to="/" />;
	}

	return (
		<form className="login-sign-form" onSubmit={onLogin}>
			<label htmlFor="email" className="label">
				Email
				<input
					name="email"
					type="email"
					placeholder="Enter Email"
					value={email}
					onChange={updateEmail}
					required
				/>
			</label>

			<label htmlFor="password" className="label">
				Password
				<input
					name="password"
					type="password"
					placeholder="Enter Password"
					value={password}
					onChange={updatePassword}
					required
				/>
			</label>
			<div className="error-list error-ctr">
				{errors.map((error, ind) => (
					<div key={ind}>{error}</div>
				))}
			</div>
			<button className="btn btn-w" type="submit">
				Login
			</button>
		</form>
	);
};

export default LoginForm;
