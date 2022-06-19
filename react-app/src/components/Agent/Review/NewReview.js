import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../../store/session";
import { useNotification } from "../../../context/Notification";

import Toggle from "../../Property/Tour/ContactForms/Toggle";
import Login from "../../Property/Tour/ContactForms/Login";
import SignUp from "../../Property/Tour/ContactForms/SignUp";

import StarRating from "../../Tools/StarRating";

import * as reviewActions from "../../../store/review";
import * as agentActions from "../../../store/agent";

const NewReview = ({ onClose, agent }) => {
	const dispatch = useDispatch();

	const user = useSelector((state) => state.session.user);
	const [showLogin, setShowLogin] = useState(true);
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [rating, setRating] = useState(1);
	const [content, setContent] = useState("");
	const [maxChar, setMaxChar] = useState(2000);
	const [errors, setErrors] = useState([]);

	const { setToggleNotification, setNotificationMsg } = useNotification();

	const onDemoLogin = async (e) => {
		e.preventDefault();
		const email = "demo@aa.io";
		const password = "password";
		await dispatch(login(email, password));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (rating && rating < 6) {
			const newReview = {
				rating,
				content,
				agent_id: agent.id,
			};
			const data = await dispatch(reviewActions.addReview(newReview));
			if (!data.errors) {
				// dispatch and update agent info
				await dispatch(agentActions.getThisAgent(agent.id));
				// notification
				setNotificationMsg("Review posted");
				setToggleNotification("");
				setTimeout(() => {
					setToggleNotification("notification-move");
					setNotificationMsg("");
				}, 2000);
				// if succeed, close modal
				onClose();
			} else {
				setErrors(data.errors);
			}
		} else {
			setErrors(["Min 1 star required"]);
		}
	};

	useEffect(() => {
		setMaxChar(2000 - content.length);
	}, [content]);

	if (user && user.id === agent.id) {
		return (
			<div className="review-ctrl">
				Agents are not allowed to review themselves
			</div>
		);
	} else if (user) {
		return (
			<form className="review-ctrl" onSubmit={handleSubmit}>
				<div className="for">Write a review for</div>
				{agent?.photo && (
					<div
						className="photo"
						style={{ backgroundImage: `url("${agent.photo}")` }}
					></div>
				)}
				<div className="agent-name">{agent.username}</div>
				<div className="stars-wrap">
					<div className="stars-how">
						How many stars would you like to give?
					</div>
					<StarRating rating={rating} setRating={setRating} />
					<div className="errors">Required *</div>
				</div>
				<div className="content-wrap">
					<div className="content-how">
						Would you like to share your experience?
					</div>
					<textarea
						maxLength="2000"
						className="textarea"
						placeholder="Write a review"
						value={content}
						onChange={(e) => setContent(e.target.value)}
					/>
					<div className="reveiew-char">
						(Optional) {maxChar} characters left (Max 2,000)
					</div>
				</div>
				{errors && (
					<div className="error-list error-ctr">
						{errors.map((err) => (
							<div key={err}>{err}</div>
						))}
					</div>
				)}
				<div className="btn-wrap">
					<button type="button" className="btn btn-bl" onClick={onClose}>
						Cancel
					</button>
					<button type="submit" className="btn">
						Submit Review
					</button>
				</div>
			</form>
		);
	} else {
		return (
			<div className="review-ctrl">
				<Toggle setShowLogin={setShowLogin} showLogin={showLogin} />
				{showLogin && <Login email={email} setEmail={setEmail} />}
				{!showLogin && (
					<SignUp
						email={email}
						setEmail={setEmail}
						username={username}
						setUsername={setUsername}
					/>
				)}
				<div className="login-sign-connect">Or connect with:</div>
				<button
					type="button"
					className="btn btn-bl btn-w"
					onClick={onDemoLogin}
				>
					Demo Login
				</button>
			</div>
		);
	}
};

export default NewReview;
