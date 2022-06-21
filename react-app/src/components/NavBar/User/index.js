import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutButton from "../../auth/LogoutButton";

import logo from "../../../assets/logo-blue.svg";
import no_photo from "../../../assets/no_photo.svg";

import { Modal } from "../../../context/Modal";
import UserProfile from "../../Profile/UserProfile";

const UserBar = () => {
	const user = useSelector((state) => state.session.user);
	const [showMenu, setShowMenu] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const image = user.photo || no_photo;

	const dropdownRef = useRef();

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
				{/* <NavLink className="btn-font-lt" to="/chats" exact={true}>
					<i className="fa-regular fa-comment"></i> Chats
				</NavLink> */}
				<NavLink className="btn-font-lt" to="/appointments" exact={true}>
					Appointments
				</NavLink>
				<div
					className="photo"
					style={{ backgroundImage: `url("${image}")` }}
					onClick={openMenu}
				>
					{showMenu && (
						<div className="dropdown" ref={dropdownRef}>
							<div className="div">
								<button
									className="btn-font-lt"
									onClick={() => setShowModal(true)}
								>
									Edit my profile
								</button>
							</div>
							<div className="div">
								<LogoutButton />
							</div>
						</div>
					)}
				</div>
			</div>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<UserProfile onClose={() => setShowModal(false)} />
				</Modal>
			)}
		</nav>
	);
};
export default UserBar;
