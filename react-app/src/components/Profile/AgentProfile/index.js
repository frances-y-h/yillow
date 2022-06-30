import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { useNotification } from "../../../context/Notification";

import UploadPhoto from "../UploadPhoto";

import * as sessionActions from "../../../store/session";

const AgentProfile = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const agent = useSelector((state) => state.session.user);
	const [username, setUsername] = useState("");
	const [office, setOffice] = useState("");
	const [license_num, setLicense_num] = useState("");
	const [bio, setBio] = useState("");
	const [phone, setPhone] = useState("");
	const [maxChar, setMaxChar] = useState(2000);
	const [errors, setErrors] = useState([]);
	const [zip, setZip] = useState("");
	const [zipErrors, setZipErrors] = useState([]);

	const { setToggleNotification, setNotificationMsg } = useNotification();

	const undo = (e) => {
		e.preventDefault();
		setErrors([]);
		setUsername(agent?.username);
		setOffice(agent?.office);
		setLicense_num(agent?.license_num);
		setBio(agent?.bio);
		setPhone(agent?.phone);
	};

	const removeServiceArea = async (zipcode) => {
		setZipErrors([]);
		const data = await dispatch(sessionActions.removeServiceArea(zipcode));
		if (data.errors) {
			setZipErrors(data.errors);
		} else {
			setZip("");
		}
	};

	const addServiceAreas = async (e) => {
		e.preventDefault();
		setZipErrors([]);
		const payload = { zip };

		const data = await dispatch(sessionActions.addServiceArea(payload));
		if (data.errors) {
			setZipErrors(data.errors);
		} else {
			setZip("");
		}
	};

	const handleSubmit = async (e) => {
		setErrors([]);
		e.preventDefault();
		const payload = {
			username,
			office,
			license_num,
			bio,
			phone,
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
		} else {
			setErrors(data.errors);
		}
	};

	useEffect(() => {
		setUsername(agent?.username);
		setOffice(agent?.office);
		setLicense_num(agent?.license_num);
		setBio(agent?.bio);
		setPhone(agent?.phone);
	}, [agent]);

	useEffect(() => {
		if (bio?.length) {
			setMaxChar(2000 - bio?.length);
		} else {
			setMaxChar(2000);
		}
	}, [bio]);

	return (
		<div className="agent-profile-div">
			<form className="agent-ctrl" onSubmit={handleSubmit}>
				<div className="split">
					<div className="center">
						<UploadPhoto />
						<label className="agent-label">
							Full Name
							<input
								maxLength="40"
								className="name agent-profile-input"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								placeholder="Full Name"
								required
							/>
						</label>
						<label className="agent-label">
							Office
							<input
								maxLength="100"
								className="office agent-profile-input"
								value={office}
								onChange={(e) => setOffice(e.target.value)}
								placeholder="Office"
								required
							/>
						</label>
						<label className="agent-label">
							License #
							<input
								maxLength="20"
								className="license agent-profile-input"
								value={license_num}
								onChange={(e) => setLicense_num(e.target.value)}
								placeholder="License Number"
								required
							/>
						</label>
						<div className="agent-profile">
							<div className="about">About</div>
							<div>
								<textarea
									maxLength="2000"
									className="textarea"
									value={bio}
									onChange={(e) => setBio(e.target.value)}
									rows="4"
									placeholder="Introduce yourself"
								/>
								<div className="error-list">
									{maxChar} characters left (max 2,000)
								</div>
							</div>
						</div>
					</div>
					<div className="agent-profile gap40">
						<div className="btn-wrap-rt">
							<div className="error-list">
								{errors.map((err) => (
									<div key={err}>{err}</div>
								))}
							</div>
							<button
								type="button"
								className="btn"
								onClick={() => history.push(`/agents/${agent.id}`)}
							>
								Profile Public View
							</button>
							<button type="button" className="btn btn-bl" onClick={undo}>
								Undo
							</button>
							<button type="submit" className="btn">
								Update
							</button>
						</div>
						<div className="gap15">
							<div className="about">Contact</div>
							<div className="phone">
								Tel{" "}
								<input
									type="text"
									className="agent-input"
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
									placeholder="123-456-7890"
									required
								/>
							</div>
							<div className="phone">{agent?.email}</div>
						</div>
					</div>
				</div>
			</form>
			<form className="bio-wrap agent-sa" onSubmit={addServiceAreas}>
				<div className="gap15">
					<div className="about">Service Areas</div>
					<div className="service-area-btn-wrap">
						<input
							className="agent-input"
							type="number"
							maxLength="5"
							placeholder="5 digit zip code only"
							value={zip}
							onChange={(e) => setZip(e.target.value)}
						/>
						<button type="button" className="btn" onClick={addServiceAreas}>
							Add
						</button>
						<div className="error-list">
							{zipErrors.map((err) => (
								<div key={err}>{err}</div>
							))}
						</div>
					</div>
					<div className="bio gap5">
						{agent?.areas.map((each) => (
							<div className="service-area-btn-wrap" key={each.zip}>
								<button
									type="button"
									className="btn btn-sm"
									onClick={() => removeServiceArea(each.zip)}
								>
									Remove
								</button>
								<span className="zip"> {each.zip}</span> -{" "}
								{each.cities?.join(", ")}
							</div>
						))}
					</div>
				</div>
			</form>
		</div>
	);
};

export default AgentProfile;
