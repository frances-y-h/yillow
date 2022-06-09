import { useRef, useEffect } from "react";

const Toggle = ({ showLogin, setShowLogin }) => {
	const loginRef = useRef();
	const signupRef = useRef();

	useEffect(() => {
		if (showLogin) {
			loginRef.current.classList.add("ref-active");
			signupRef.current.classList.remove("ref-active");
		} else {
			loginRef.current.classList.remove("ref-active");
			signupRef.current.classList.add("ref-active");
		}
	}, [showLogin]);

	return (
		<div className="login-sign-toggle-wrap">
			<div
				className="login-btn"
				ref={loginRef}
				onClick={() => setShowLogin(true)}
			>
				Sign in
			</div>
			<div
				className="login-btn"
				ref={signupRef}
				onClick={() => setShowLogin(false)}
			>
				New Account
			</div>
		</div>
	);
};

export default Toggle;
