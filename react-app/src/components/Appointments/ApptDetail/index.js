import { useSelector } from "react-redux";

import Agent from "./Agent";
import Client from "./Client";

const ApptDetail = ({ appt, past, onClose }) => {
	const user = useSelector((state) => state.session.user);
	if (user.agent) {
		return <Agent appt={appt} past={past} onClose={onClose} />;
	} else {
		return <Client appt={appt} past={past} onClose={onClose} />;
	}
};

export default ApptDetail;
