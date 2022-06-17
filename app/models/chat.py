from .db import db

class Chat(db.Model):
    __tablename__ = "chats"

    id = db.Column(db.Integer, primary_key=True)
    channel_id = db.Column(db.Integer, db.ForeignKey("Channel.id", nullable=False))
    user_id = db.Column(db.Integer, db.ForeignKey("User.id", nullable=False))
    message = db.Column(db.String(2000), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

    channel = db.relationship("Channel", back_populates="chats")
    user = db.relationship("User", back_populates="chats")

    def to_dict(self):
        return {
            "id": self.id,
            "channel_id": self.channel_id,
            "user_id": self.user_id,
            "message": self.message,
            "created_at": self.created_at.isoformat(),
        }
