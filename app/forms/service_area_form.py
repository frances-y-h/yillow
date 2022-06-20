from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length, ValidationError, Regexp
from app.models import AgentArea
from flask_login import current_user


class ServiceAreaForm(FlaskForm):
    zip = StringField("zip", validators=[DataRequired(), Regexp('\d{5}', message="Zip code must be 5 numbers only")])
