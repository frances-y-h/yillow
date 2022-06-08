from flask import Blueprint, jsonify, request
from app.models import User, Appointment, Property
from flask_login import current_user
from datetime import datetime
from app.forms import AddAppointmentForm

appointment_routes = Blueprint("appointments", __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@appointment_routes.route("/", methods=["POST"])
def add_appointment():
    form = AddAppointmentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_appointment = datetime(form.data["appointment"])

        # Check all the appointments in property to see if it overlaps
        property_id = form.data("property_id")
        property = Property.query.get(property_id)
        appointments = [appointment.appointment for appointment in property.appointments]

        if new_appointment in appointments:
            return {}

        # Check user appointment to see if overlaps
        user = User.query.get(current_user.id)

        return {"success": "success"}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
