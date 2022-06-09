import { useRef, useEffect } from "react";

const Toggle = ({ login, setLogin }) => {
	const loginRef = useRef();
	const signupRef = useRef();

	useEffect(() => {
		if (login) {
			loginRef.current.classList.add("ref-active");
			signupRef.current.classList.remove("ref-active");
		} else {
			loginRef.current.classList.remove("ref-active");
			signupRef.current.classList.add("ref-active");
		}
	}, [login]);

	return (
		<div className="login-sign-toggle-wrap">
			<div className="login-btn" ref={loginRef} onClick={() => setLogin(true)}>
				Sign in
			</div>
			<div
				className="login-btn"
				ref={signupRef}
				onClick={() => setLogin(false)}
			>
				New Account
			</div>
		</div>
	);
};

export default Toggle;
