import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useNotification } from "../../../context/Notification";

import UploadPhoto from "../UploadPhoto";

import no_photo from "../../../assets/no_photo.svg";

import * as sessionActions from "../../../store/session";

const UserProfile = ({ onClose }) => {
	const dispatch = useDispatch();

	const user = useSelector((state) => state.session.user);
	const [username, setUsername] = useState("");
	const [errors, setErrors] = useState([]);

	const { setToggleNotification, setNotificationMsg } = useNotification();

	const image = user.photo || no_photo;

	const updateProfile = async (e) => {
		e.preventDefault();
		console.log("click");
		const payload = {
			username,
		};
		const data = await dispatch(sessionActions.updateThisUser(payload));

		if (!data.errors) {
			// Notification if updated
			setToggleNotification("");
			setNotificationMsg("Profile updated");

			setTimeout(() => {
				setToggleNotification("notification-move");
				setNotificationMsg("");
			}, 2000);
			onClose();
		} else {
			setErrors(data.errors);
		}
	};

	useEffect(() => {
		setUsername(user.username);
	}, [user]);

	return (
		<div className="user-profile-modal">
			<div className="title">My Profile</div>
			<UploadPhoto />
			<label className="label">
				Username
				<input
					maxLength="40"
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
			</label>
			<label className="label">
				Email
				<input
					type="email"
					placeholder="Email"
					value={user?.email}
					required
					disabled
				/>
			</label>
			<div className="error-list">
				{errors.map((err) => (
					<div key={err}>{err}</div>
				))}
			</div>
			<div className="btn-wrap">
				<button type="button" className="btn btn-bl" onClick={onClose}>
					Cancel
				</button>
				<button type="button" className="btn" onClick={updateProfile}>
					Update
				</button>
			</div>
		</div>
	);
};

export default UserProfile;
