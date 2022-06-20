const Stars = ({ rating }) => {
	const ratingPtg = rating * 20;

	return (
		<div className="big-star-wrap">
			<span
				className="big-star-sprite"
				style={{ width: `${ratingPtg}%` }}
			></span>
		</div>
	);
};

export default Stars;
