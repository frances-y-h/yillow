const SelectDate = ({ property }) => {
	return (
		<>
			<div className="tour-type">In-person</div>
			<div className="tour-prefered">Select a preferred time</div>
			<div className="tour-date-wrap">
				<div className="tour-date-arrow">
					<i className="fa-solid fa-chevron-left"></i>
				</div>
				<div></div>
				<div></div>
				<div></div>
				<div className="tour-date-arrow">
					<i className="fa-solid fa-chevron-right"></i>
				</div>
			</div>
			<div>dropdown</div>
			<button className="btn btn-w">Reques this time</button>
			<img className="tour-img" src={property?.front_img} alt="Property" />
		</>
	);
};

export default SelectDate;
