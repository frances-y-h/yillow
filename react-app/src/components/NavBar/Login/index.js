import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../../store/session";

import LoginForm from "../../auth/LoginForm";
import SignUpForm from "../../auth/SignUpForm";

const Login = () => {
	const dispatch = useDispatch();
	const [login, setLogin] = useState(true);

	const onDemoLogin = async (e) => {
		e.preventDefault();
		const email = process.env.REACT_APP_DEMO_EMAIL;
		const password = process.env.REACT_APP_DEMO_PASSWORD;
		const data = await dispatch(login(email, password));
	};

	return (
		<div>
			<div>Welcome to Zillow</div>
			<div>
				<button>Sign in</button>
				<button>New Account</button>
			</div>
			<button type="button" onClick={onDemoLogin}>
				Demo Login
			</button>
		</div>
	);
};

export default Login;
