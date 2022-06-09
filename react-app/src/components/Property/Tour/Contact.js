import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../../store/session";

import LoggedIn from "./ContactForms/LoggedIn";
import Toggle from "./ContactForms/Toggle";
import LoginAppointment from "./ContactForms/Login";
import SignUp from "./ContactForms/SignUp";

const Contact = ({ property, today, hour, setShowSelectDate, setShowTour }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);

	const [username, setUsername] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState(
		`I am interested in ${property.st_num} ${property.st_name}, ${property.city}, ${property.state} ${property.zip}.`
	);

	const [showLogin, setShowLogin] = useState(true);

	const appointment = new Date(`${today} ${hour}`);

	const onDemoLogin = async (e) => {
		e.preventDefault();
		const email = "demo@aa.io";
		const password = "password";
		await dispatch(login(email, password));
	};

	useEffect(() => {
		if (user) {
			setUsername(user.username);
			if (user.phone) setPhone(user.phone);
			setEmail(user.email);
		}
	}, [user]);

	return (
		<>
			<div className="tour-appt-time">
				{appointment.toDateString()} at {appointment.toLocaleTimeString()}
				<button className="btn-font" onClick={() => setShowSelectDate(true)}>
					Edit
				</button>
			</div>

			{user && (
				<LoggedIn
					user={user}
					property={property}
					username={username}
					setUsername={setUsername}
					phone={phone}
					setPhone={setPhone}
					email={email}
					setEmail={setEmail}
					message={message}
					setMessage={setMessage}
					today={today}
					hour={hour}
					setShowTour={setShowTour}
				/>
			)}
			{!user && <Toggle setShowLogin={setShowLogin} showLogin={showLogin} />}
			{!user && showLogin && (
				<LoginAppointment
					property={property}
					email={email}
					setEmail={setEmail}
					message={message}
					setMessage={setMessage}
					today={today}
					hour={hour}
					setShowTour={setShowTour}
				/>
			)}
			{!user && !showLogin && (
				<SignUp
					property={property}
					username={username}
					setUsername={setUsername}
					phone={phone}
					setPhone={setPhone}
					email={email}
					setEmail={setEmail}
					message={message}
					setMessage={setMessage}
					today={today}
					hour={hour}
					setShowTour={setShowTour}
				/>
			)}
			{!user && (
				<button type="button" className="btn btn-bl" onClick={onDemoLogin}>
					Continue with Demo Login
				</button>
			)}
			<div className="tour-tnc">
				By pressing Request visit, you are contacting a buyer's agent, you agree
				that Yillow Group and its affiliates, and real estate professionals may
				call/text you about your inquiry, which may involve use of automated
				means and prerecorded/artificial voices. You don't need to consent as a
				condition of buying any property, goods or services. Message/data rates
				may apply. You also agree to our Terms of Use. Yillow does not endorse
				any real estate professionals. We may share information about your
				recent and future site activity with your agent to help them understand
				what you're looking for in a home.
			</div>
		</>
	);
};

export default Contact;
