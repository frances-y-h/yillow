import { useSelector } from "react-redux";

const ChatBox = ({ chat }) => {
	const user = useSelector((state) => state.session.user);
	const channels = useSelector((state) => state.channels);
	const channel = channels[chat?.channel_id];

	const username = user.agent ? channel?.user_name : channel?.agent_name;
	const photo = user.agent ? channel?.user_photo : channel?.agent_photo;

	if (chat?.user_id === user?.id) {
		return (
			<div className="my-chatbox-wrap">
				<div className="my-message">{chat?.message}</div>
			</div>
		);
	} else {
		return (
			<div className="other-chatbox-wrap">
				{photo ? (
					<div
						className="photo"
						style={{ backgroundImage: `url("${photo}")` }}
					></div>
				) : (
					<div className="photo">No photo</div>
				)}
				<div>
					<div className="username">{username}</div>
					<div className="other-message">{chat?.message}</div>
				</div>
			</div>
		);
	}
};

export default ChatBox;
