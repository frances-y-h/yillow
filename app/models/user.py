from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    phone = db.Column(db.String(40))
    agent = db.Column(db.Boolean(), default=False)
    license_num = db.Column(db.String(20))
    bio = db.Column(db.String(2000))
    photo = db.Column(db.String)
    broker_license = db.Column(db.String(40))
    office = db.Column(db.String(100))

    properties = db.relationship("Property", back_populates="listing_agent")

    user_reviews = db.relationship("Review", back_populates="user", primaryjoin="User.id == Review.user_id")
    agent_reviews = db.relationship("Review", back_populates="agent", primaryjoin="User.id == Review.agent_id")

    user_appointments = db.relationship("Appointment", back_populates="user", primaryjoin="User.id == Appointment.user_id")
    agent_appointments = db.relationship("Appointment", back_populates="agent", primaryjoin="User.id == Appointment.agent_id")


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        if self.agent:
            return {
                'id': self.id,
                'username': self.username,
                'email': self.email,
                "phone": self.phone,
                "agent": self.agent,
                "license_num": self.license_num,
                "bio" : self.bio,
                "photo": self.photo,
                "broker_license": self.broker_license,
                "office": self.office
            }
        else:
            return {
                'id': self.id,
                'username': self.username,
                'email': self.email,
                "phone": self.phone,
                "photo": self.photo,
                "appointments": [appointment.appointment.isoformat() for appointment in self.user_appointments]
            }
