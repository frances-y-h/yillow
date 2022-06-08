from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, Length

from app.models import User, Property


class AddAppointmentForm(FlaskForm):
    property_id = IntegerField("property_id", validators=[DataRequired()])
    date = StringField("date", validators=[DataRequired()])
    time = StringField("time", validators=[DataRequired()])
    message = StringField("message", validators=[Length(min=0, max=255, message="Message must be at most 255 characters")])
