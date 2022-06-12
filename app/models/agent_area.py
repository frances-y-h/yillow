from .db import db

class AgentArea(db.Model):
    __tablename__ = "agent_areas"

    id = db.Column(db.Integer, primary_key=True)
    agent_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    zip = db.Column(db.Integer, nullable=False)
