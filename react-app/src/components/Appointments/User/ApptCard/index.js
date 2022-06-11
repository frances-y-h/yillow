import { useState } from "react";
import { useSelector } from "react-redux";

import ApptDate from "../../../Tools/Date";

import { Modal } from "../../../../context/Modal";
import ApptDetail from "./ApptDetail";

const ApptCard = ({ appt, past }) => {
	const properties = useSelector((state) => state.properties);
	const agents = useSelector((state) => state.agents);

	const property = properties[appt?.property_id];
	const agent = agents[appt?.agent_id];

	const [showModal, setShowModal] = useState(false);

	const onClose = () => {
		setTimeout(() => {
			setShowModal(false);
		}, 1);
	};

	return (
		<div className="appt-card" onClick={() => setShowModal(true)}>
			{property && (
				<div
					className="appt-house"
					style={{ backgroundImage: `url('${property.front_img}')` }}
				></div>
			)}
			<div className="appt-detail-wrap">
				<div className="appt-time">
					<ApptDate date={appt?.date} time={appt?.time} />
				</div>
				<div className="appt-address-wrap">
					<div className="appt-address-title">Address</div>
					<div className="appt-address">
						<div>
							{property?.st_num} {property?.st_name},
						</div>
						<div>
							{property?.city}, {property?.state}, {property?.zip}
						</div>
					</div>
				</div>
				<div className="appt-address-wrap">
					<div className="appt-address-title">Agent</div>
					<div>{agent ? agent?.username : "No agent assinged yet"}</div>
				</div>
			</div>
			{showModal && (
				<Modal onClose={onClose}>
					<ApptDetail appt={appt} past={past} onClose={onClose} />
				</Modal>
			)}
		</div>
	);
};

export default ApptCard;
