import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { parseISO, formatRelative } from "date-fns";

const ChatBox = ({ chat, editChat, deleteChat }) => {
	const user = useSelector((state) => state.session.user);
	const channels = useSelector((state) => state.channels);
	const channel = channels[chat?.channel_id];

	const username = user.agent ? channel?.user_name : channel?.agent_name;
	const photo = user.agent ? channel?.user_photo : channel?.agent_photo;
	const [time, setTime] = useState("");
	const [editMsg, setEditMsg] = useState(false);
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		if (chat && chat.created_at) {
			setTime(formatRelative(parseISO(chat.created_at), new Date()));
		}
		setMessage(chat?.message);
	}, [chat]);

	if (chat?.user_id === user?.id) {
		return (
			<div className="my-chatbox-wrap">
				<form
					className="my-message"
					onSubmit={(e) => {
						e.preventDefault();
						setError("");
						if (message.length) {
							editChat({ id: chat.id, message });
							setEditMsg(false);
						} else {
							setError("Please write a message or delete");
						}
					}}
				>
					{editMsg ? (
						<input
							type="text"
							value={message}
							onChange={(e) => setMessage(e.target.value)}
						/>
					) : (
						<div className="msg">{message}</div>
					)}
					{error && <div className="chat-error">{error}</div>}
				</form>
				<div className="time">
					<i
						className="fa-solid fa-pen"
						onClick={() => {
							setEditMsg(!editMsg);
							setError("");
						}}
					></i>
					<i
						className="fa-regular fa-trash-can"
						onClick={() => {
							deleteChat(chat.id);
						}}
					></i>
					{time}
				</div>
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
					<div className="time">{time}</div>
				</div>
			</div>
		);
	}
};

export default ChatBox;
