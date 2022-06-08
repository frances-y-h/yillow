import { useDispatch } from "react-redux";
import { useState } from "react";

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
	setShowTour,
}) => {
	const dispatch = useDispatch();
	const [errors, setErrors] = useState([]);

	const handleSubmit = async () => {
		const appointment = {
			property_id: property.id,
			date: today,
			time: hour,
			message,
		};
		const data = await dispatch(appointmentActions.addAppointment(appointment));

		if (!data.errors) {
			// notify appointment booked
			alert("Appointment booked. You can access it from Appointments");
			setShowTour(false);
		} else {
			setErrors(data.errors);
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
			{errors && (
				<div className="error-list">
					{errors.map((err) => (
						<div key={err}>{err}</div>
					))}
				</div>
			)}
			<button type="button" className="btn" onClick={handleSubmit}>
				Request visit
			</button>
		</>
	);
};

export default LoggedIn;
