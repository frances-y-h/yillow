from .db import db

class State(db.Model):
    __tablename__ = "states"

    id = db.Column(db.Integer, primary_key=True)
    state = db.Column(db.String(2), unique=True)
    long = db.Column(db.String(20), unique=True)

    properties = db.relationship("Property", back_populates="state")
