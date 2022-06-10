from .db import db

class Review(db.Model):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    agent_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    content = db.Column(db.String(2000))
    date = db.Column(db.Date, nullable=False)

    user = db.relationship("User", foreign_keys=[user_id], back_populates="user_reviews")
    agent = db.relationship("User", foreign_keys=[agent_id], back_populates="agent_reviews")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "agent_id" :self.agent_id,
            "rating": self.rating,
            "content": self.content,
            "date": self.date,
        }
