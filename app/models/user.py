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
    def appointments(self):
        if self.agent:
            return self.agent_appointments
        else:
            return self.user_appointments

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
            avg_review_lst = [review.rating for review in self.agent_reviews]
            avg = sum(avg_review_lst) / len(avg_review_lst)

            reviews = [review.to_dict() for review in self.agent_reviews]
            recent_review = reviews[-1] or ""

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
                "office": self.office,
                "recent_review": recent_review["content"],
                "reviewIds" : [review.id for review in self.agent_reviews],
                "rating": round(avg, 1)
            }
        else:
            return {
                'id': self.id,
                'username': self.username,
                'email': self.email,
                "phone": self.phone,
                "photo": self.photo,
            }
