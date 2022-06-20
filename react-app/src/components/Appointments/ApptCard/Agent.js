import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useNotification } from "../../../context/Notification";
import ReactTooltip from "react-tooltip";

import Stars from "../../Tools/Stars";
import StarRating from "../../Tools/StarRating";

import * as reviewActions from "../../../store/review";
import * as agentActions from "../../../store/agent";
import * as channelActions from "../../../store/channel";

const Agent = ({ agent, appt }) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const [write, setWrite] = useState(false);
	const [rating, setRating] = useState(1);
	const [content, setContent] = useState("");
	const [errors, setErrors] = useState([]);
	const [char, setChar] = useState(2000);

	const { setToggleNotification, setNotificationMsg } = useNotification();

	const navigateAgent = (e) => {
		e.preventDefault();
		history.push(`/agents/${agent.id}`);
	};

	const cancel = (e) => {
		e.preventDefault();
		setWrite(false);
		setErrors([]);
		setRating(1);
		setContent("");
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
				setNotificationMsg("Review posted. Visit Agent Profile");
				setToggleNotification("");
				setTimeout(() => {
					setToggleNotification("notification-move");
					setNotificationMsg("");
				}, 2000);
				// if succeed, setWrite to false
				setWrite(false);
				setRating(1);
				setContent("");
			} else {
				setErrors(data.errors);
			}
		} else {
			setErrors(["Min 1 star required"]);
		}
	};

	const chatWithAgent = async (e) => {
		e.preventDefault();
		const this_channel = { user_id: appt.user_id, agent_id: appt.agent_id };
		// send a post request to channels. will create channel if does not exist
		const data = await dispatch(channelActions.addThisChannel(this_channel));
		// use history to redirect
		history.push(`/chats/${data.id}`);
	};

	useEffect(() => {
		setChar(2000 - content.length);
	}, [content]);

	if (agent) {
		return (
			<div className="appt-agent-wrap">
				{agent.photo ? (
					<div
						className="appt-photo"
						style={{ backgroundImage: `url("${agent.photo}")` }}
						onClick={navigateAgent}
						data-tip="Visit Agent Profile"
					></div>
				) : (
					<div
						className="appt-photo"
						onClick={navigateAgent}
						data-tip="Visit Agent Profile"
					>
						No Photo
					</div>
				)}
				<div className="appt-agent-details">
					<div
						className="name"
						onClick={navigateAgent}
						data-tip="Visit Agent Profile"
					>
						{agent.username}{" "}
						<span className="license">DRE# {agent.license_num}</span>
					</div>
					<div>
						Tel {agent.phone} | {agent.email}
					</div>
					<button className="btn btn-gr" onClick={chatWithAgent}>
						Chat with Agent <i className="fa-regular fa-comment"></i>
					</button>
					<div className="office">{agent.office.toUpperCase()}</div>
					<div className="appt-agent-reviews">
						<Stars rating={agent?.rating} />
						<span
							className="appt-agents-write"
							onClick={() => setWrite(!write)}
						>
							Write a Review
						</span>
					</div>
					{write && (
						<div className="review-box">
							<div className="review-rating">
								<StarRating rating={rating} setRating={setRating} />
								<span className="reveiew-char">Required *</span>
							</div>
							<div>
								<textarea
									maxLength="2000"
									rows="5"
									className="appt-input"
									value={content}
									onChange={(e) => setContent(e.target.value)}
									placeholder="Write a review"
								/>
								<div className="reveiew-char">
									(Optional) {char} characters left (Max 2,000)
								</div>
							</div>
							{errors && (
								<div className="error-list error-ctr">
									{errors.map((err) => (
										<div key={err}>{err}</div>
									))}
								</div>
							)}
							<div className="appt-edit-btn-wrap">
								<button type="button" className="btn btn-bl" onClick={cancel}>
									Cancel
								</button>
								<button type="submit" className="btn" onClick={handleSubmit}>
									Submit
								</button>
							</div>
						</div>
					)}
				</div>
				<ReactTooltip />
			</div>
		);
	} else {
		return (
			<div className="appt-no-agent-wrap">
				<div>No agent have accpeted your appointment yet.</div>
				<div>Please check back at a later time.</div>
			</div>
		);
	}
};

export default Agent;
