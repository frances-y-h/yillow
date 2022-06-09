from flask import Blueprint, jsonify, request
from app.models import db, Review
from flask_login import current_user, login_required
from app.forms import ReviewForm

review_routes = Blueprint("reviews", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@review_routes.route("/", methods=['GET', 'POST'])
def reviews():
    if request.method == 'GET':
        return {"Get reviews": "get"}

    if request.method == 'POST':

        if not current_user:
            return {"errors": ["Please login to review"]}

        form = ReviewForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            review = Review(
                agent_id=form.data["agent_id"], \
                user_id=current_user.id, \
                rating=form.data["rating"], \
                content=form.data["content"])

            db.session.add(review)
            db.session.commit()

            return {"review": review.to_dict()}
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
