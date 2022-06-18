import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import UploadPhoto from "../UploadPhoto";

import no_photo from "../../../assets/no_photo.svg";

const UserProfile = ({ onClose }) => {
	const user = useSelector((state) => state.session.user);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");

	const image = user.photo || no_photo;

	const updateProfile = (e) => {
		e.preventDefault();
		// do the thing
	};

	useEffect(() => {
		setUsername(user.username);
		setEmail(user.email);
	}, [user]);

	return (
		<form className="user-profile-modal" onSubmit={updateProfile}>
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
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					disabled={user?.id === 1}
				/>
			</label>
			<div className="btn-wrap">
				<button type="button" className="btn btn-bl" onClick={onClose}>
					Cancel
				</button>
				<button type="submit" className="btn">
					Update
				</button>
			</div>
		</form>
	);
};

export default UserProfile;
