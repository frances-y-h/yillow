import { useDispatch } from "react-redux";

import * as appointmentActions from "../../../../store/appointment";

const LoggedIn = ({
	user,
	today,
	hour,
	property,
	username,
	setUsername,
	phone,
	setPhone,
	email,
	setEmail,
	message,
	setMessage,
}) => {
	const dispatch = useDispatch();

	const handleSubmit = async () => {
		const appointment = {
			property_id: property.id,
			appointment: `${today} ${hour}`,
			message,
		};
		console.log(appointment);
		const data = await dispatch(appointmentActions.addAppointment(appointment));
		if (data.errors) {
			console.log(data.errors);
		} else {
			// notify appointment booked
		}
	};

	return (
		<>
			<label className="label" htmlFor="name">
				Name
				<input
					type="text"
					name="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					disabled={user}
					required
				/>
			</label>
			<label className="label" htmlFor="phone">
				Phone
				<input
					type="text"
					name="phone"
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
					disabled={user}
				/>
			</label>
			<label className="label" htmlFor="email">
				Email
				<input
					type="email"
					name="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					disabled={user}
					required
				/>
			</label>
			<label className="label" htmlFor="message">
				Message
				<textarea
					name="message"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
			</label>
			<button type="button" className="btn" onClick={handleSubmit}>
				Request visit
			</button>
		</>
	);
};

export default LoggedIn;
