import { useSelector } from "react-redux";

import AgentProfile from "./AgentProfile";

const Profile = () => {
	const user = useSelector((state) => state.session.user);

	if (user.agent) {
		return <AgentProfile />;
	} else {
		return <div>not agent</div>;
	}
};

export default Profile;
