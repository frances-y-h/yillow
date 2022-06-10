import { Link } from "react-router-dom";

import Stars from "../../Tools/Stars";
import map from "../../../assets/staticmap.png";

const TableRow = ({ agent }) => {
	return (
		<tr>
			<td className="agents-col">
				{agent?.photo ? (
					<Link
						to={`/agents/${agent.id}`}
						className="agents-photo"
						style={{ backgroundImage: `url("${agent.photo}")` }}
					></Link>
				) : (
					<Link to={`/agents/${agent.id}`} className="agents-photo">
						No Photo
					</Link>
				)}
				<div className="agents-detail">
					<Link to={`/agents/${agent.id}`} className="name">
						{agent?.username}
					</Link>
					<div className="phone">{agent?.phone}</div>
					<Stars rating={agent?.rating} />
					<Link to={`/agents/${agent.id}`} className="reviews">
						{agent?.reviews?.length} total reviews
					</Link>
					<div className="office">{agent?.office}</div>
					<div className="office">Agent License #: {agent?.license_num}</div>
				</div>
			</td>
			<td>
				<img className="agents-map" src={map} alt="Locatoin" />
			</td>
			<td className="review">
				<Link to={`/agents/${agent.id}`} className="more">
					More Reviews
				</Link>
				{agent?.reviews.length > 0 ? (
					<div>{agent?.reviews[0].content}</div>
				) : (
					<div>Be the first to write an review</div>
				)}
			</td>
		</tr>
	);
};

export default TableRow;
