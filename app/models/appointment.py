from .db import db

class Appointment(db.Model):
    __tablename__ = "appointments"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    agent_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    property_id = db.Column(db.Integer, db.ForeignKey("properties.id"), nullable=False)
    appointment = db.Column(db.DateTime, nullable=False)
    message = db.Column(db.String(255))
    canceled = db.Column(db.Boolean)

    user = db.relationship("User", foreign_keys=[user_id], back_populates="user_appointments")
    agent = db.relationship("User", foreign_keys=[agent_id], back_populates="agent_appointments")
    property = db.relationship("Property", back_populates="appointments")
