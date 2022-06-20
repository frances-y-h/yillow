import Stars from "../Tools/Stars";

const Review = ({ review }) => {
	return (
		<div className="review">
			<div className="review-edit">
				<div>
					<div>Review by {review?.username}</div>
					<div className="review-star">
						<Stars rating={review?.rating} />
					</div>
					<div>{review?.date}</div>
				</div>
			</div>
			<div>{review?.content}</div>
		</div>
	);
};

export default Review;
