from .db import db

class Appointment(db.Model):
    __tablename__ = "appointments"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    agent_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    property_id = db.Column(db.Integer, db.ForeignKey("properties.id"), nullable=False)
    date = db.Column(db.String(50), nullable=False)
    time = db.Column(db.String(50), nullable=False)
    message = db.Column(db.String(255))
    canceled = db.Column(db.Boolean)

    user = db.relationship("User", foreign_keys=[user_id], back_populates="user_appointments")
    agent = db.relationship("User", foreign_keys=[agent_id], back_populates="agent_appointments")
    property = db.relationship("Property", back_populates="appointments")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "username": self.user.username,
            "email": self.user.email,
            "user_photo": self.user.photo,
            "agent_id": self.agent_id,
            "property_id": self.property_id,
            "date": self.date,
            "time": self.time,
            "message": self.message,
            "canceled": self.canceled,
        }

    def appt(self):
        return f"{self.date} {self.time}"
