from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length, ValidationError, NumberRange
from app.models import User

def valid_agent(form, field):
    # check if user is an agent
    agent_id = field.data
    agent = User.query.get(agent_id)
    if not agent:
        raise ValidationError("Agent does not exist")
    if agent.agent == False:
        raise ValidationError("Agent does not exist")

class ReviewForm(FlaskForm):
    agent_id = IntegerField("agent_id", validators=[DataRequired(), valid_agent])
    rating = IntegerField("rating", validators=[DataRequired(), NumberRange(min=1, max=5, message="Rating must be between 1 to 5")] )
    content = StringField("content", validators=[Length(min=0, max=2000, message="Message must be less than 2000 characters")])
