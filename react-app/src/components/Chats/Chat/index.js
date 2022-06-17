import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Chat = () => {
	const channelParam = useParams().channelId;
	const chats = useSelector((state) => state.chats);

	if (channelParam) {
		const channelId = parseInt(channelParam, 10);

		return (
			<div className="chat-chats-wrap">
				<div>chats</div>
				<div>Input</div>
			</div>
		);
	} else if (chats) {
		return <div>Click to start chat</div>;
	} else {
		return <div>Start by adding </div>;
	}
};

export default Chat;
