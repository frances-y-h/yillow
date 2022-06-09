import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../../../../store/session";

const SignUp = ({ username, setUsername, email, setEmail }) => {
	const dispatch = useDispatch();

	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const [matchErr, setMatchErr] = useState("");

	const onSignUp = async (e) => {
		e.preventDefault();
		if (password === repeatPassword) {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				setErrors(data);
				setPassword("");
				setRepeatPassword("");
			}
		}
	};

	useEffect(() => {
		if (password && password !== repeatPassword) {
			setMatchErr("Password does not match");
		} else {
			setMatchErr("");
		}
	}, [password, repeatPassword]);

	return (
		<>
			<label className="label" htmlFor="username">
				<div>
					Username <span className="input-error">Required *</span>
				</div>
				<input
					type="text"
					name="username"
					onChange={(e) => setUsername(e.target.value)}
					value={username}
					placeholder="Enter Username"
					required={true}
				></input>
			</label>
			<label className="label" htmlFor="email">
				<div>
					Email <span className="input-error">Required *</span>
				</div>
				<input
					type="text"
					name="email"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					placeholder="Enter Email"
					required={true}
				></input>
			</label>
			<label className="label" htmlFor="password">
				<div>
					Password <span className="input-error">Required *</span>
				</div>
				<input
					type="password"
					name="password"
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					placeholder="Create password"
					required={true}
				></input>
			</label>

			<label className="label" htmlFor="repeat_password">
				<div>
					Confirm Password <span className="input-error">Required *</span>
				</div>
				<input
					type="password"
					name="repeat_password"
					onChange={(e) => setRepeatPassword(e.target.value)}
					value={repeatPassword}
					placeholder="Confirm Password"
					required={true}
				></input>
			</label>

			<div className="error-list error-ctr">
				{errors.map((error, ind) => (
					<div key={ind}>{error}</div>
				))}
				{matchErr && <div>{matchErr}</div>}
			</div>
			<button className="btn btn-w" type="submit" onClick={onSignUp}>
				Sign up first
			</button>
		</>
	);
};

export default SignUp;
