import { Link } from "react-router-dom";

import Stars from "../../Tools/Stars";

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
						{agent?.reviewIds?.length} total reviews
					</Link>
					<div className="office">{agent?.office}</div>
					<div className="office">Agent License #: {agent?.license_num}</div>
				</div>
			</td>
			<td className="area">
				{agent?.areas.map((each) => (
					<div key={agent.id + each.zip}>
						<span className="zip">{each.zip}</span> - {each.cities.join(", ")}
					</div>
				))}
			</td>
			<td className="agents-review-wrap">
				<Link to={`/agents/${agent?.id}`} className="more">
					More Reviews
				</Link>
				{agent?.recent_review ? (
					<div className="recent-review">{agent?.recent_review}</div>
				) : (
					<div>Be the first to write an review</div>
				)}
			</td>
		</tr>
	);
};

export default TableRow;
