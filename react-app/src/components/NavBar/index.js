import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../store/session";

import AgentBar from "./Agent";
import UserBar from "./User";

import logo from "../../assets/logo-blue.svg";
import { Modal } from "../../context/Modal";
import Login from "./Login";

const NavBar = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);
	const [showLogin, setShowLogin] = useState(false);
	const [showMenu, setShowMenu] = useState(false);

	const dropdownRef = useRef(null);

	const openMenu = (e) => {
		e.preventDefault();
		setTimeout(() => {
			setShowMenu(true);
		}, 1);
		document.addEventListener("click", closeMenu);
	};

	const closeMenu = (e) => {
		e.preventDefault();
		if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
			setShowMenu(false);
			document.removeEventListener("click", closeMenu);
		}
	};

	const onLogin = async (e) => {
		e.preventDefault();
		const email = "demo@aa.io";
		const password = "password";
		await dispatch(login(email, password));
	};

	const onAgentLogin = async (e) => {
		e.preventDefault();
		const email = "agent1@user.com";
		const password = "password";
		await dispatch(login(email, password));
	};

	const onClose = () => {
		setShowLogin(false);
	};

	if (user && user.agent) {
		return <AgentBar />;
	} else if (user) {
		return <UserBar />;
	} else {
		return (
			<nav className="nav">
				<div className="nav-lf">
					<NavLink to="/about" className="btn-font-lt">
						About
					</NavLink>
					<NavLink to="/agents" className="btn-font-lt">
						Agent Finder
					</NavLink>
				</div>
				<NavLink to="/" exact={true}>
					<img src={logo} alt="Yillow" />
				</NavLink>
				<div className="nav-rt">
					<button className="btn-font-lt" onClick={() => setShowLogin(true)}>
						Login
					</button>
					<button type="button" className="btn-font-lt" onClick={openMenu}>
						Demo Login
					</button>
					{showMenu && (
						<div className="dropdown demo-login" ref={dropdownRef}>
							<button type="button" className="btn btn-w" onClick={onLogin}>
								User Demo Login
							</button>
							<button
								type="button"
								className="btn btn-bl"
								onClick={onAgentLogin}
							>
								Agent Demo Login
							</button>
						</div>
					)}
					{showLogin && (
						<Modal onClose={onClose}>
							<Login />
						</Modal>
					)}
				</div>
			</nav>
		);
	}
};

export default NavBar;
