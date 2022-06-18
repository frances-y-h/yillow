from flask_socketio import SocketIO, emit, join_room, leave_room
from flask_login import current_user
from app.models import db, Chat
import os

if os.environ.get("FLASK_ENV") == "production":
    origins = ["http://yillow-app.herokuapp.com", "https://yillow-app.herokuapp.com"]
else:
    origins = "*"

socketio = SocketIO(cors_allowed_origins=origins)

@socketio.on("join")
def on_join(channel_id):
    join_room(channel_id)

@socketio.on("leave")
def on_leave(channel_id):
    leave_room(channel_id)

@socketio.on("chat")
def handle_chat(data):
    channel_id = data['channel_id']
    user_id = data['user_id']
    message = data["message"]
    created_at = data["created_at"]

    new_chat = Chat(channel_id=channel_id, user_id=user_id, message=message, created_at=created_at)
    db.session.add(new_chat)
    db.session.commit()


    emit("chat", new_chat.to_dict(),\
     to=str(channel_id),
      broadcast=True)

@socketio.on("edit")
def handle_edit(data):
    chat_id = data["id"]
    message = data["message"]

    chat = Chat.query.get(chat_id)
    chat.message = message

    db.session.commit()

    emit("edit", chat.to_dict(), to=str(chat.channel_id), broadcast=True)

@socketio.on("delete")
def handle_delete(chat_id):
    chat = Chat.query.get(chat_id)
    channel_id = str(chat.channel_id)

    db.session.delete(chat)
    db.session.commit()

    data = {"chat_id": chat_id, "channel_id": int(channel_id)}

    emit("delete", data, to=channel_id, broadcast=True)
