import React from "react";
// import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
// import LogoutButton from "../auth/LogoutButton";

import AgentBar from "./Agent";
import UserBar from "./User";

const NavBar = () => {
	const user = useSelector((state) => state.session.user);

	if (user && user.agent) {
		return <AgentBar />;
	} else {
		return <UserBar />;
	}
};

export default NavBar;
