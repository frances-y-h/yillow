import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutButton from "../../auth/LogoutButton";

import logo from "../../../assets/logo-white.svg";

const AgentBar = () => {
	const user = useSelector((state) => state.session.user);

	return (
		<nav className="nav nav-agent">
			<div className="nav-lf">
				<NavLink to="/about">About</NavLink>
				<NavLink to="/agents">Agent Finder</NavLink>
			</div>
			<NavLink to="/" exact={true}>
				<img src={logo} alt="Yillow" />
			</NavLink>
			<div className="nav-rt">
				<NavLink to="/appointments" exact={true}>
					Appointments
				</NavLink>
				<NavLink to="/profile" exact={true}>
					My Profile
				</NavLink>
				<LogoutButton />
			</div>
		</nav>
	);
};

export default AgentBar;
