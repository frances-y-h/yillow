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
import Notification from "./components/Tools/Notification";
import Agents from "./components/Agents";
import Agent from "./components/Agent";
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
			<Notification />
			<Switch>
				<Route path="/" exact={true}>
					<Splash />
				</Route>
				{/* <Route path="/search" exact={true}>
					<div>another page</div>
				</Route> */}
				<Route path="/search/:searchParam" exact={true}>
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
				<Route path="/agents" exact={true}>
					<Agents />
				</Route>
				<Route path="/agents/:agentId">
					<Agent />
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
				<Route>
					<div>404</div>
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
