from flask import Blueprint, jsonify
from app.models import User

agent_routes = Blueprint('agents', __name__)

    # const response = await fetch(`/api/agents/${agent_id}`);
@agent_routes.route("/<int:agent_id>")
def get_agent(agent_id):
    agent = User.query.filter(User.id == agent_id, User.agent == True).first()
    if agent:
        return {"agent": agent.to_dict()}
    else:
        return {"errors": ["Unauthorized"]}
