from flask import Blueprint, jsonify, request
from app.models import db, User, Property, Appointment
from flask_login import current_user, login_required
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




@appointment_routes.route("/", methods=["GET", "POST"])
@login_required
def add_appointment():

    if request.method == "GET":
        appointments = [appt.to_dict() for appt in current_user.appointments]
        property_ids = [appt.property_id for appt in current_user.appointments]
        agent_ids = [appt.agent_id for appt in current_user.appointments]

        properties = Property.query.filter(Property.id.in_(property_ids)).all()
        agents = User.query.filter(User.id.in_(agent_ids)).all()

        return {
            "appointments": appointments,
            "agents": [agent.to_dict() for agent in agents],
            "properties": [property.to_dict() for property in properties],
            }

    if request.method == "POST":
        form = AddAppointmentForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():

            # Check all the appointments in property to see if it overlaps
            property_id = form.data["property_id"]
            date = form.data["date"]
            time = form.data["time"]
            message = form.data["message"]

            # check if date is prior to today
            date_lst = date.split("-")
            time_lst = time.split(":")

            year = int(date_lst[0])
            month = int(date_lst[1])
            day = int(date_lst[2])
            hour = int(time_lst[0])
            min = int(time_lst[1])

            now = datetime.now()
            appt = datetime(year, month, day, hour, min)
            if appt < now:
                return {"errors": ["Date cannot be prior to current dates"]}

            if hour < 8 or hour > 19:
                return  {"errors": ["Visit hour out of range"]}

            # Check user appointment to see if overlaps
            user_appt = Appointment.query.filter(Appointment.user_id == current_user.id,  Appointment.date == date, Appointment.time == time).first()

            if user_appt:
                return {"errors": ["You already have another appointment at this timeslot"]}

            # query for to see if it is not avaliable
            exists = Appointment.query.filter(Appointment.property_id == property_id, Appointment.date == date, Appointment.time == time).first()

            if exists:
                return {"errors": ["Timeslot not avaliable"]}


            new_appointment = Appointment(
                user_id=current_user.id,
                date=date, time=time,
                message=message,
                property_id=property_id,
                agent_id=4)

            db.session.add(new_appointment)
            db.session.commit()

            return {
                "appointment": new_appointment.to_dict()
            }

        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
