from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired


class NewChannelForm(FlaskForm):
    user_id = IntegerField("user_id", validators=[DataRequired()])
    agent_id = IntegerField("agent_id", validators=[DataRequired()])
