import StarFull from "../../assets/stars/star-solid.svg";
import StarHalf from "../../assets/stars/star-half.svg";
import StarOutline from "../../assets/stars/star-regular.svg";

const Stars = ({ rating }) => {
	let num = rating;
	const starArr = [];

	for (let i = 0; i < 5; i++) {
		if (num >= 1) {
			starArr.push(1);
		} else if (num < 1 && num > 0) {
			starArr.push(0.5);
		} else {
			starArr.push(0);
		}
		num -= 1;
	}

	return (
		<div className="star-wrap">
			{starArr.map((num) => {
				if (num === 1)
					return <img className="star" src={StarFull} alt="star" />;
				else if (num === 0.5)
					return <img className="star" src={StarHalf} alt="star" />;
				else return <img className="star" src={StarOutline} alt="star" />;
			})}
		</div>
	);
};

export default Stars;
