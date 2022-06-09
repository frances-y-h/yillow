import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../../store/session";

import LoginForm from "../../auth/LoginForm";
import SignUpForm from "../../auth/SignUpForm";

const Login = () => {
	const dispatch = useDispatch();
	const [loginForm, setLoginForm] = useState(true);

	const loginRef = useRef();
	const signupRef = useRef();

	const onDemoLogin = async (e) => {
		e.preventDefault();
		const email = process.env.REACT_APP_DEMO_EMAIL;
		const password = process.env.REACT_APP_DEMO_PASSWORD;
		await dispatch(login(email, password));
	};

	useEffect(() => {
		if (loginForm) {
			loginRef.current.classList.add("ref-active");
			signupRef.current.classList.remove("ref-active");
		} else {
			loginRef.current.classList.remove("ref-active");
			signupRef.current.classList.add("ref-active");
		}
	}, [loginForm]);

	return (
		<div className="login-sign-modal">
			<div className="login-sign-title">Welcome to Zillow</div>
			<div className="login-sign-toggle-wrap">
				<div
					className="login-btn"
					ref={loginRef}
					onClick={() => setLoginForm(true)}
				>
					Sign in
				</div>
				<div
					className="login-btn"
					ref={signupRef}
					onClick={() => setLoginForm(false)}
				>
					New Account
				</div>
			</div>
			{loginForm ? <LoginForm /> : <SignUpForm />}
			<div className="login-sign-connect">Or connect with:</div>
			<button type="button" className="btn btn-bl" onClick={onDemoLogin}>
				Continue with Demo Login
			</button>
		</div>
	);
};

export default Login;
