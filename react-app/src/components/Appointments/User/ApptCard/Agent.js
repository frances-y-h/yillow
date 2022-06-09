const Agent = ({ agent }) => {
	if (agent) {
		return (
			<div className="appt-agent-wrap">
				{agent.photo ? (
					<div
						className="appt-photo"
						style={{ backgroundImage: `url("${agent.photo}")` }}
					></div>
				) : (
					<div className="appt-photo">No Photo</div>
				)}
				<div className="appt-agent-details">
					<div className="name">
						{agent.username}{" "}
						<span className="license">DRE# {agent.license_num}</span>
					</div>
					<div>Tel {agent.phone}</div>
					<div>{agent.email}</div>
					<div className="office">{agent.office.toUpperCase()}</div>
					<span className="license">DRE# {agent.license_num}</span>
					<div>Leave a review</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className="appt-no-agent-wrap">
				<div>No agent have accpeted your appointment yet.</div>
				<div>Please check back at a later time.</div>
			</div>
		);
	}
};

export default Agent;
