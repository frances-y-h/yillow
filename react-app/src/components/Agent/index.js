import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import find_agent from "../../assets/find_agent.svg";
import Review from "./Review";
import Stars from "../Tools/Stars";
import no_photo from "../../assets/no_photo.svg";

import { Modal } from "../../context/Modal";
import NewReview from "./Review/NewReview";

import * as agentActions from "../../store/agent";
import * as reviewActions from "../../store/review";

import * as channelActions from "../../store/channel";

const Agent = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { agentId } = useParams();
	const agents = useSelector((state) => state.agents);
	const reviews = useSelector((state) => state.reviews);
	const user = useSelector((state) => state.session.user);
	const [agent, setAgent] = useState({});
	const [showModal, setShowModal] = useState(false);

	const onClose = () => {
		setShowModal(false);
	};

	useEffect(() => {
		dispatch(agentActions.getThisAgent(agentId));
		dispatch(reviewActions.getAllReviews(agentId));
	}, [dispatch]);

	useEffect(() => {
		if (agents) {
			setAgent(agents[agentId]);
		}
	}, [agents]);

	const chatWithAgent = async (e) => {
		e.preventDefault();
		const this_channel = { user_id: user.id, agent_id: agent.id };
		// send a post request to channels. will create channel if does not exist
		const data = await dispatch(channelActions.addThisChannel(this_channel));
		// use history to redirect
		history.push(`/chats/${data.id}`);
	};

	if (agent) {
		const image = agent?.photo || no_photo;

		return (
			<div className="agent-ctrl">
				<div className="split">
					<div className="center">
						<div
							className="photo"
							style={{ backgroundImage: `url("${image}")` }}
						></div>
						<div className="name">{agent?.username}</div>
						<div className="office">{agent?.office}</div>
						<div className="license">License # {agent?.license_num}</div>
					</div>
					<div className="bio-wrap">
						<div className="gap15">
							<div className="about">About</div>
							<div className="bio">{agent?.bio}</div>
						</div>
						<div className="gap15">
							<div className="about">Service Areas</div>
							<div className="bio">
								{agent?.areas?.map((each) => (
									<div key={each.zip}>
										<span className="zip">{each.zip}</span> -{" "}
										{each.cities?.join(", ")}
									</div>
								))}
							</div>
						</div>
						<div className="gap15">
							<div className="about">Contact</div>
							<div className="phone">Tel {agent?.phone}</div>
							<div className="phone">{agent?.email}</div>
							{user && !user.agent && (
								<button
									className="btn-gr btn-short"
									type="button"
									onClick={chatWithAgent}
								>
									Chat with Agent <i className="fa-regular fa-comment"></i>
								</button>
							)}
						</div>
						<div>
							Average Rating {agent?.rating} <Stars rating={agent?.rating} />
						</div>
					</div>
				</div>
				<div className="agent-review-ctrl">
					<div className="title">
						<div>Reviews</div>
						{user?.id !== agent?.id && (
							<button
								type="button"
								className="btn"
								onClick={() => setShowModal(true)}
							>
								Write a Review
							</button>
						)}
					</div>
					{agent && agent?.reviewIds?.length ? (
						<>
							{agent.reviewIds.map((id, idx) => (
								<Review review={reviews[id]} key={"review" + idx} />
							))}
						</>
					) : (
						<div className="review">Be te first to review</div>
					)}
				</div>
				{showModal && (
					<Modal onClose={onClose}>
						<NewReview onClose={onClose} agent={agent} />
					</Modal>
				)}
			</div>
		);
	} else {
		return (
			<div className="agent-404-ctrl">
				<img src={find_agent} alt="404" />
				<div className="title">Sorry! We couldn't find anyone.</div>
				<div className="desc">
					We couldn't find anyone matching your search. Please adjust your
					filters and try again.
				</div>
			</div>
		);
	}
};

export default Agent;
