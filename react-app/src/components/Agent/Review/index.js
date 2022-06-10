import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Stars from "../../Tools/Stars";
import StarRating from "../../Tools/StarRating";

import * as reviewActions from "../../../store/review";
import * as agentActions from "../../../store/agent";

const Review = ({ review }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);
	const [edit, setEdit] = useState(false);
	const [rating, setRating] = useState(1);
	const [content, setContent] = useState("");
	const [maxChar, setMaxChar] = useState(2000);
	const [errors, setErrors] = useState([]);

	const [showModal, setShowModal] = useState(false);

	const update = async (e) => {
		e.preventDefault();
		const reviewToUpdate = {
			id: review.id,
			rating,
			content,
			agent_id: review.agent_id,
		};
		console.log(reviewToUpdate);
		const data = await dispatch(reviewActions.editReview(reviewToUpdate));
		if (!data.errors) {
			// dispatch and update agent info
			await dispatch(agentActions.getThisAgent(review.agent_id));

			setEdit(false);
		} else {
			setErrors(data.errors);
		}
	};

	const cancel = () => {
		setEdit(false);
		setRating(review.rating);
		setContent(review.content);
	};

	useEffect(() => {
		setMaxChar(2000 - content.length);
	}, [content]);

	useEffect(() => {
		setRating(review.rating);
		setContent(review.content);
	}, [review]);

	return (
		<div className="review">
			<div className="review-edit">
				<div>
					<div className="review-star">
						{edit ? (
							<>
								<StarRating rating={rating} setRating={setRating} />{" "}
								<span className="error-list">Required *</span>
							</>
						) : (
							<Stars rating={review.rating} />
						)}
					</div>
					<div>{review.date}</div>
				</div>
				{user && user?.id === review.user_id && (
					<div className="edit-wrap">
						<i className="fa-solid fa-pen" onClick={() => setEdit(!edit)}></i>
						<i
							className="fa-solid fa-trash-can"
							onClick={() => setShowModal(true)}
						></i>
					</div>
				)}
			</div>
			{edit ? (
				<>
					<div className="edit-textarea-wrap">
						<textarea
							className="textarea"
							value={content}
							onChange={(e) => setContent(e.target.value)}
						/>
					</div>
					<div className="btn-wrap">
						<div className="error-list">
							(Optional) You have {maxChar} characters left (Max 2000)
							{errors &
								errors.map((err, idx) => <div key={"err" + idx}>{err}</div>)}
						</div>
						<div className="btn-group">
							<button type="button" className="btn btn-bl" onClick={cancel}>
								Cancel
							</button>
							<button type="button" className="btn" onClick={update}>
								Submit
							</button>
						</div>
					</div>
				</>
			) : (
				<div>{review.content}</div>
			)}
		</div>
	);
};

export default Review;
