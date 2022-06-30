import { useRef, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import no_photo from "../../../assets/no_photo.svg";

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
	}, [channelParam, channel]);

	if (user.agent) {
		const image = channel.user_photo || no_photo;

		return (
			<div className="channel-user-wrap" ref={userRef} onClick={navigateChat}>
				<div
					className="photo"
					style={{ backgroundImage: `url("${image}")` }}
				></div>
				<div>{channel?.user_name}</div>
			</div>
		);
	} else {
		const image = channel.agent_photo || no_photo;
		return (
			<div className="channel-user-wrap" ref={userRef} onClick={navigateChat}>
				<div
					className="photo"
					style={{ backgroundImage: `url("${image}")` }}
				></div>

				<div className="agent-detail">
					<div>{channel?.agent_name}</div>
					<div className="office">{channel?.agent_office.toUpperCase()}</div>
				</div>
			</div>
		);
	}
};

export default Channels;
