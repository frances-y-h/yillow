from flask import Blueprint, jsonify, request
from app.models import db, Channel, User, Chat
from flask_login import current_user, login_required
from app.forms import NewChannelForm

channel_routes = Blueprint("channels", __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@channel_routes.route("/", methods=["GET", "POST"])
@login_required
def channels():
    if request.method == "GET":

        if current_user.agent:
            channels = [channel.to_dict() for channel in current_user.agent_channels]
            chat_ids = [channel.to_dict()["chat_ids"] for channel in current_user.agent_channels]
        else:
            channels = [channel.to_dict() for channel in current_user.user_channels]
            chat_ids = [channel.to_dict()["chat_ids"] for channel in current_user.user_channels]

        chat_ids = [el for lst in chat_ids for el in lst]

        chats = Chat.query.filter(Chat.id.in_(chat_ids)).all()

        return {
            "channels": channels,
            "chats": [chat.to_dict() for chat in chats],
            }

    if request.method == "POST":
        form = NewChannelForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            user_id = form.data['user_id']
            agent_id = form.data['agent_id']

            channel = Channel.query.filter(Channel.user_id == user_id, Channel.agent_id == agent_id).first()

            if channel:
                return {"channel": channel.to_dict()}

            else:
                new_channel = Channel(user_id=user_id, agent_id=agent_id)

                db.session.add(new_channel)
                db.session.commit()

                return {"channel": new_channel.to_dict()}
