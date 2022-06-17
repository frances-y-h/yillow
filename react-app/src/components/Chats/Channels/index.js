import { useRef, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Channels = ({ channel }) => {
	const history = useHistory();
	const user = useSelector((state) => state.session.user);
	const channelParam = useParams().channelId;
	const userRef = useRef();

	const navigateChat = () => {
		history.push(`/chats/${channel.id}`);
	};

	useEffect(() => {
		const channelId = channelParam ? parseInt(channelParam, 10) : undefined;
		if (channelId && channelId === channel?.id) {
			userRef.current.classList.add("active");
		} else {
			userRef.current.classList.remove("active");
		}
	}, [channelParam]);

	if (user.agent) {
		return (
			<div className="channel-user-wrap" ref={userRef} onClick={navigateChat}>
				{channel?.user_photo ? (
					<div
						className="photo"
						style={{ backgroundImage: `url("${channel.user_photo}")` }}
					></div>
				) : (
					<div className="photo">No Photo</div>
				)}
				<div>{channel?.user_name}</div>
			</div>
		);
	} else {
		return (
			<div className="channel-user-wrap" ref={userRef} onClick={navigateChat}>
				{channel?.agent_photo ? (
					<div
						className="photo"
						style={{ backgroundImage: `url("${channel.agent_photo}")` }}
					></div>
				) : (
					<div className="photo">No Photo</div>
				)}
				<div className="agent-detail">
					<div>{channel?.agent_name}</div>
					<div className="office">{channel?.agent_office.toUpperCase()}</div>
				</div>
			</div>
		);
	}
};

export default Channels;
