import { useNotification } from "../../context/Notification";

const Notification = () => {
	const { toggleNotification, notificationMsg } = useNotification();
	return (
		<div className={`notification-div ${toggleNotification}`}>
			<i className="fa-solid fa-house"></i>
			{notificationMsg}
		</div>
	);
};

export default Notification;
