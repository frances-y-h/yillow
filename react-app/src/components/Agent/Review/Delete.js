import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNotification } from "../../../context/Notification";

import Stars from "../../Tools/Stars";

import * as reviewActions from "../../../store/review";
import * as agentActions from "../../../store/agent";

const Delete = ({ review, onClose }) => {
	const dispatch = useDispatch();
	const [errors, setErrors] = useState([]);
	const agentId = parseInt(useParams().agentId);

	const { setNotificationMsg, setToggleNotification } = useNotification();

	const deleteReview = async (e) => {
		e.preventDefault();
		// delete review
		const data = await dispatch(reviewActions.deleteThisReview(review.id));
		if (!data) {
			// dispatch to update agent
			await dispatch(agentActions.getThisAgent(agentId));
			// notification
			setNotificationMsg("Review deleted");
			setToggleNotification("");
			setTimeout(() => {
				setToggleNotification("notification-move");
				setNotificationMsg("");
			}, 2000);
			onClose();
		} else {
			// To the thing
			setErrors(data.errors);
		}
	};

	return (
		<div className="review-delete">
			<div className="title">Would you like to delete this review?</div>
			<div className="error-list error-ctr">
				{errors.map((err) => (
					<div key={err}>{err}</div>
				))}
			</div>
			<div className="btn-wrap">
				<button type="button" className="btn btn-bl" onClick={onClose}>
					Cancel
				</button>
				<button type="button" className="btn btn-red" onClick={deleteReview}>
					Delete
				</button>
			</div>
			<div>
				<Stars rating={review?.rating} />

				<div>{review?.date}</div>
			</div>
			<div className="content">{review?.content}</div>
		</div>
	);
};

export default Delete;
