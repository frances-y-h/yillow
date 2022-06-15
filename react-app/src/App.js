import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Splash from "./components/Splash";
import Search from "./components/Search";
import SearchArea from "./components/Search/SearchArea";
import Appointments from "./components/Appointments";
import Notification from "./components/Tools/Notification";
import Agents from "./components/Agents";
import Agent from "./components/Agent";
import NotFound from "./components/NotFound";
import Profile from "./components/Profile";
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
				<Route path="/search/:searchParam" exact={true}>
					<Search />
				</Route>
				<Route path="/area/:areaParam" exact={true}>
					<SearchArea />
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
				<ProtectedRoute path="/appointments" exact={true}>
					<Appointments />
				</ProtectedRoute>
				<ProtectedRoute path="/profile" exact={true}>
					<Profile />
				</ProtectedRoute>
				<Route>
					<NotFound />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
