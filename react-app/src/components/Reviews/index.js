import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import BigStars from "../Tools/BigStars";
import Review from "./Review";

import * as reviewActions from "../../store/review";

const Reviews = () => {
	const dispatch = useDispatch();
	const agent = useSelector((state) => state.session.user);
	const reviews = useSelector((state) => state.reviews);

	useEffect(() => {
		dispatch(reviewActions.getAllReviews(agent.id));
	}, [dispatch, agent]);

	return (
		<div className="agent-rvw-ctrl">
			<div className="agent-rvw-stars-wrap">
				<BigStars rating={agent?.rating} />
				<div>Average Rating {agent?.rating} Stars</div>
			</div>
			<div className="agent-review-ctrl">
				<div className="title">Reviews</div>
				{agent?.reviewIds.length > 0 ? (
					agent?.reviewIds.map((id) => <Review review={reviews[id]} />)
				) : (
					<div className="review">Go get some reviews</div>
				)}
			</div>
		</div>
	);
};
export default Reviews;
