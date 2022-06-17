from app.models import db, Chat
from datetime import datetime

def seed_chat():
    chat1 = Chat(channel_id=1, user_id=1, message="Do we meet at the property?", created_at=datetime.now())
    chat2 = Chat(channel_id=1, user_id=4, message="Yes, I will bring the paperwork", created_at=datetime.now())

    db.session.add_all(chat1, chat2)
    db.session.commit()

def undo_chat():
    db.session.execute('TRUNCATE chats RESTART IDENTITY CASCADE;')
    db.session.commit()
