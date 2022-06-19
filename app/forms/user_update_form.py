from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length, Email
from app.models import User
from flask_login import current_user


class UserUpdateForm(FlaskForm):
    username = StringField("username", validators=[DataRequired(),Length(min=1, max=40, message="Username must be between 1 to 40 characters")])
    phone = StringField("phone",  validators=[Length(max=40, message="Phone number must be under 40 characters")])
    license_num = StringField("license_num", validators=[Length(max=20, message="License must be under 20 characters")])
    office = StringField("office", validators=[Length(max=100, message="Office must be under 100 characters")])
    bio = StringField("bio", validators=[Length(max=2000, message="Bio must be under 2000 characters")])
