import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Splash from "./components/Splash";
import Search from "./components/Search";
import Appointments from "./components/Appointments";
// import UsersList from "./components/UsersList";
// import User from "./components/User";
import { authenticate } from "./store/session";

import About from "./components/About";

function App() {
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			await dispatch(authenticate());
			setLoaded(true);
		})();
	}, [dispatch]);

	if (!loaded) {
		return null;
	}

	return (
		<BrowserRouter>
			<NavBar />
			<Switch>
				<Route path="/" exact={true}>
					<Splash />
				</Route>
				<Route path="/search">
					<Search />
				</Route>
				<Route path="/homedetails/:address">
					<div>HomeDetail</div>
				</Route>
				<Route path="/login" exact={true}>
					<LoginForm />
				</Route>
				<Route path="/sign-up" exact={true}>
					<SignUpForm />
				</Route>
				<Route path="/about" exact={true}>
					<About />
				</Route>
				<ProtectedRoute path="/profile" exact={true}>
					<h1>Profile</h1>
				</ProtectedRoute>
				<ProtectedRoute path="/appointments" exact={true}>
					<Appointments />
				</ProtectedRoute>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
