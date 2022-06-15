import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Stars from "../../Tools/Stars";

const AgentProfile = () => {
	const agent = useSelector((state) => state.session.user);
	const [username, setUsername] = useState("");
	const [office, setOffice] = useState("");
	const [license_num, setLicense_num] = useState("");
	const [bio, setBio] = useState("");
	const [phone, setPhone] = useState("");
	const [maxChar, setMaxChar] = useState(2000);

	const undo = (e) => {
		e.preventDefault();
		setUsername(agent?.username);
		setOffice(agent?.office);
		setLicense_num(agent?.license_num);
		setBio(agent?.bio);
		setPhone(agent?.phone);
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
		<form className="agent-ctrl">
			<div className="split">
				<div className="center">
					<div
						className="photo"
						style={{ backgroundImage: `url("${agent.photo}")` }}
					></div>

					<div className="name">{username}</div>
					<div className="office">{office}</div>
					<div className="license">License # {license_num}</div>
				</div>
				<div className="bio-wrap">
					<div className="btn-wrap-rt">
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
						<div className="bio">
							{agent?.areas.map((each) => (
								<div key={each.zip}>
									<span className="zip">{each.zip}</span> -{" "}
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
								className="agent-tel-input"
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
