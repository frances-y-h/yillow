const PropertyTop = ({ property }) => {
	if (property && property.front_img) {
		return (
			<div
				className="card-top"
				style={{ backgroundImage: `url("${property?.front_img}")` }}
			>
				<div className="card-events">Listed on {property?.listing_date}</div>
				{/* <div className="card-top-heart">Heart</div> */}
			</div>
		);
	} else
		return (
			<div className="card-top">
				<div className="card-events">Listed on {property?.listing_date}</div>
				{/* <div className="card-top-heart">Heart</div> */}
			</div>
		);
};

export default PropertyTop;
