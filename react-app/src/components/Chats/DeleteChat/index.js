const DeleteChat = ({ deleteChat, chat, onClose }) => {
	return (
		<div className="delete-chat-modal">
			<div>Do you want to delete this chat?</div>
			<div className="message">{chat.message}</div>
			<div className="btn-wrap">
				<button type="button" className="btn" onClick={onClose}>
					Cancel
				</button>
				<button
					type="button"
					className="btn btn-red"
					onClick={() => deleteChat(chat.id)}
				>
					Delete
				</button>
			</div>
		</div>
	);
};

export default DeleteChat;
