import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import UploadPhoto from "../UploadPhoto";
import Stars from "../../Tools/Stars";

const AgentProfile = () => {
	const agent = useSelector((state) => state.session.user);
	const [username, setUsername] = useState("");
	const [office, setOffice] = useState("");
	const [license_num, setLicense_num] = useState("");
	const [bio, setBio] = useState("");
	const [phone, setPhone] = useState("");
	const [maxChar, setMaxChar] = useState(2000);
	const [errors, setErrors] = useState([]);

	const undo = (e) => {
		e.preventDefault();
		setUsername(agent?.username);
		setOffice(agent?.office);
		setLicense_num(agent?.license_num);
		setBio(agent?.bio);
		setPhone(agent?.phone);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const payload = {
			username,
			office,
			license_num,
			bio,
			phone,
		};
		console.log(payload);
		// Notification if updated
	};

	useEffect(() => {
		setUsername(agent?.username);
		setOffice(agent?.office);
		setLicense_num(agent?.license_num);
		setBio(agent?.bio);
		setPhone(agent?.phone);
	}, []);

	useEffect(() => {
		setMaxChar(2000 - bio.length);
	}, [bio]);

	return (
		<form className="agent-ctrl" onSubmit={handleSubmit}>
			<div className="split">
				<div className="center">
					{/* {agent.photo ? (
						<div
							className="photo"
							style={{ backgroundImage: `url("${agent.photo}")` }}
						>
            						<UploadPhoto /></div>
					) : ( */}
					<div className="photo">
						Upload Photo
						<UploadPhoto />
					</div>
					{/* )} */}
					<button type="button" className="btn-font-lt">
						Remove Photo
					</button>
					<label className="agent-label">
						Full Name
						<input
							maxLength="40"
							className="name agent-profile-input"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							placeholder="Full Name"
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
						/>
					</label>
				</div>
				<div className="bio-wrap">
					<div className="btn-wrap-rt">
						<div className="error-list">
							{errors.map((err) => (
								<div key={err}>{err}</div>
							))}
						</div>
						<button type="button" className="btn btn-bl" onClick={undo}>
							Undo
						</button>
						<button type="submit" className="btn">
							Update
						</button>
					</div>
					<div className="gap15">
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
					<div className="gap15">
						<div className="about">Service Areas</div>
						<div className="service-area-btn-wrap">
							<input
								className="agent-input"
								type="number"
								maxLength="5"
								placeholder="5 digit zip code only"
							/>
							<button type="button" className="btn">
								Add
							</button>
						</div>
						<div className="bio gap5">
							{agent?.areas.map((each) => (
								<div className="service-area-btn-wrap" key={each.zip}>
									<button type="button" className="btn btn-sm">
										Remove
									</button>
									<span className="zip"> {each.zip}</span> -{" "}
									{each.cities?.join(", ")}
								</div>
							))}
						</div>
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
							/>
						</div>
						<div className="phone">{agent?.email}</div>
					</div>
					{/* <div>
						Average Rating {agent?.rating} <Stars rating={agent?.rating} />
					</div> */}
				</div>
			</div>
		</form>
	);
};

export default AgentProfile;
