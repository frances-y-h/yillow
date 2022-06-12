import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TableRow from "./TableRow";

import * as agentActions from "../../store/agent";

const Agents = () => {
	const dispatch = useDispatch();
	const agents = useSelector((state) => state.agents);
	const [search, setSearch] = useState("");
	const [zip, setZip] = useState("");
	const [agentArr, setAgentArr] = useState([]);

	useEffect(() => {
		dispatch(agentActions.getAllAgents());
	}, [dispatch]);

	useEffect(() => {
		if (agents) {
			const arr = Object.values(agents)
				.filter((agent) =>
					agent?.username.toLowerCase().includes(search.toLowerCase())
				)
				.filter((agent) => {
					return agent?.areas?.some((area) => {
						return area.toString().includes(zip);
					});
				});

			setAgentArr(arr);
		}
	}, [agents, search, zip]);

	return (
		<div className="agents-ctrl">
			<div className="agents-title">Your personal guides</div>
			<div className="agents-search">
				<div className="agents-search-wrap">
					<label>NAME</label>
					<div>
						<input
							type="text"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder="Agent Name"
						/>
						<i className="fa-solid fa-magnifying-glass"></i>
					</div>
				</div>
				<div className="agents-search-wrap">
					<label>
						SERVICE AREAS <span>ZIP CODE ONLY</span>
					</label>
					<div>
						<input
							type="text"
							placeholder="ZIP CODE"
							maxlength="5"
							value={zip}
							onChange={(e) => setZip(e.target.value, 10)}
						/>
						<i className="fa-solid fa-magnifying-glass"></i>
					</div>
				</div>
			</div>
			<table className="agents-table">
				<thead>
					<tr>
						<th>AGENTS</th>
						<th>SERVICE AREAS</th>
						<th>CLIENT REVIEW</th>
					</tr>
				</thead>
				<tbody>
					{agentArr.map((agent, idx) => (
						<TableRow key={"agent" + idx} agent={agent} />
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Agents;
