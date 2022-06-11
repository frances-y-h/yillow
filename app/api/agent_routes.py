from flask import Blueprint, jsonify
from app.models import User, Review

agent_routes = Blueprint('agents', __name__)

@agent_routes.route("/")
def get_all_agents():
    agents = User.query.filter(User.agent == True).limit(100).all()
    return {"agents": [agent.to_dict() for agent in agents]}


@agent_routes.route("/<int:agent_id>")
def get_agent(agent_id):
    agent = User.query.filter(User.id == agent_id, User.agent == True).first()
    if agent:
        return {"agent": agent.to_dict()}
    else:
        return {"errors": ["Agent does not exist"]}, 404


@agent_routes.route("/<int:agent_id>/reviews", methods=["GET"])
def agent_reviews(agent_id):
    agent = User.query.get(agent_id)

    if agent.agent != True:
        return {"errors": ["Agent does not exist"]}, 404

    reviews = Review.query.filter(Review.agent_id == agent_id).all()

    return {"reviews": [review.to_dict() for review in reviews]}
