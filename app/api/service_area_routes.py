from flask import Blueprint, jsonify, session, request
from app.models import User, db, AgentArea
from flask_login import current_user, login_user, logout_user, login_required
from app.forms import ServiceAreaForm


service_area_routes = Blueprint('service_areas', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@service_area_routes.route("/<zip>", methods=["DELETE"])
@login_required
def delete_service_area(zip):
    service = AgentArea.query.filter(AgentArea.zip == zip, AgentArea.agent_id == current_user.id).first()

    if not service:
        return {"errors": ["Unauthorized"]}, 401

    db.session.delete(service)
    db.session.commit()

    user = User.query.get(current_user.id)

    return {"user": user.to_dict()}

@service_area_routes.route("/", methods=["POST"])
@login_required
def add_service_area():

    # If current user is not agent, not supposed to be here
    if not current_user.agent:
        return {'errors': ["Unauthorized"]}, 401

    form = ServiceAreaForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        service = AgentArea.query.filter(AgentArea.agent_id == current_user.id, AgentArea.zip == form.data["zip"]).first()
        if service:
            return {"errors": ["Zip already exists"]}

        service = AgentArea(agent_id=current_user.id, zip=form.data["zip"])
        db.session.add(service)
        db.session.commit()

        user = User.query.get(current_user.id)

        return {"user": user.to_dict()}

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
