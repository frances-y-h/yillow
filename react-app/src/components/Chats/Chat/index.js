import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import chat from "../../../assets/chat/chat.svg";

import ChatBox from "../ChatBox";

const Chat = () => {
	const channelParam = useParams().channelId;
	const channels = useSelector((state) => state.channels);
	const chats = useSelector((state) => state.chats);

	if (channelParam) {
		const channelId = parseInt(channelParam, 10);
		const channel = channels[channelId];

		return (
			<div className="chat-chats-wrap">
				<div className="chat-boxes-wrap">
					{channel?.chat_ids.map((id) => (
						<ChatBox key={id} chat={chats[id]} />
					))}
				</div>
				<form className="chat-input-ctrl">
					<label className="chat-label">
						<input
							type="text"
							maxLength="2000"
							placeholder="Say something..."
						/>
						<button type="submit">Send</button>
					</label>
				</form>
			</div>
		);
	} else if (chats) {
		return (
			<div className="blank-chat-div">
				<img className="blank-chat-img" src={chat} alt="Chat" />
				<div>Click on people to start chatting</div>
			</div>
		);
	} else {
		return (
			<div className="blank-chat-div">
				<img className="blank-chat-img" src={chat} alt="Chat" />
			</div>
		);
	}
};

export default Chat;
