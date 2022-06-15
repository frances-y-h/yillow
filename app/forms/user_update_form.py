from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User
from flask_login import current_user

class UserUpdateForm(FlaskForm):
    phone = StringField("phone",  validators=[Length(max=40, message="Phone number must be under 40 characters")])
    license = StringField("license", validators=[Length(max=20, message="License must be under 20 characters")])
