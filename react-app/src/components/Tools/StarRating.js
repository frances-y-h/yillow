const StarRating = ({ rating, setRating }) => {
	return (
		<div className="star-rating">
			{[...Array(5)].map((star, idx) => {
				idx += 1;
				return (
					<button
						type="button"
						key={idx}
						className={idx <= rating ? "on" : "off"}
						onClick={() => setRating(idx)}
					>
						<span className="star">
							<i className="fa-solid fa-star"></i>
						</span>
					</button>
				);
			})}
		</div>
	);
};

export default StarRating;
