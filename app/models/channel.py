from .db import db

class Channel(db.Model):
    __tablename__ = 'channels'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    agent_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    user = db.relationship("User", foreign_keys=[user_id], back_populates="user_channels")
    agent = db.relationship("User", foreign_keys=[agent_id], back_populates="agent_channels")

    chats = db.relationship("Chat", back_populates="channel")


    def to_dict(self):
        chat_ids = [chat.id for chat in self.chats]

        return {
            "id": self.id,
            "user_id": self.user_id,
            "user_name": self.user.username,
            "user_photo": self.user.photo,
            "agent_id": self.agent_id,
            "agent_name": self.agent.username,
            "agent_photo": self.agent.photo,
            "agent_office": self.agent.office,
            "chat_ids": sorted(chat_ids),
        }
