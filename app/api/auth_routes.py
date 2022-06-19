from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm, UserUpdateForm
from flask_login import current_user, login_user, logout_user, login_required
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)


auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/', methods=['GET', "PUT"])
def authenticate():
    """
    Authenticates a user.
    """
    if request.method == 'GET':
        if current_user.is_authenticated:
            return current_user.to_dict()
        return {'errors': ['Unauthorized']}

    if request.method == "PUT":
        form = UserUpdateForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():

            user = User.query.filter(User.id == current_user.id).first()
            user.username = form.data['username']


            if current_user.agent:
                license_exists = User.query.filter(User.license_num == form.data['license_num'], User.id != current_user.id).first()

                if license_exists:
                    return {"errors": ["License number belongs to another agent"]}

                user.phone = form.data["phone"]
                user.license_num = form.data["license_num"]
                user.office = form.data["office"]
                user.bio = form.data["bio"]

            db.session.commit()

            return {"user": user.to_dict()}
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': ["Invalid email or password"]}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password']
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401


@auth_routes.route("/photo", methods=['POST'])
@login_required
def upload_photo():
    if "image" not in request.files:
        return {"errors": ["image required"]}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": ["file type not permitted"]}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    # flask_login allows us to get the current user from the request
    user = User.query.get(current_user.id)

    user.photo = url
    db.session.commit()

    return {"url": url}
