from sqlalchemy import or_
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
        properties = Property.query.filter(Property.id.in_(property_ids)).all()

        if current_user.agent:
            return {
                "appointments": appointments,
                "properties": [property.to_dict() for property in properties],
            }
        else:
            agent_ids = [appt.agent_id for appt in current_user.appointments]
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
                return {"errors": ["Date cannot be prior to current date"]}

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

@appointment_routes.route("/<int:appointment_id>", methods=["GET", "PUT", "DELETE"])
@login_required
def edit_appointment(appointment_id):

    if request.method == "GET":
        appt = Appointment.query \
            .filter(Appointment.id == appointment_id) \
            .filter(or_(Appointment.user_id == current_user.id, Appointment.agent_id == current_user.id)) \
            .first()
        if appt:
            return {"appointment": appt.to_dict()}
        else:
            return {"errors": ["Unauthorized"]}

    if request.method == "PUT":
        form = AddAppointmentForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():

            # get basic info from form
            property_id = form.data["property_id"]
            date = form.data["date"]
            time = form.data["time"]
            message = form.data["message"]

            # check if property exits
            property = Property.query.get(property_id)

            if not property:
                return {"errors": ["Property does not exists"]}

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
                return {"errors": ["Date cannot be prior to current date"]}

            if hour < 8 or hour > 19:
                return  {"errors": ["Visit hour out of range"]}


            # Make sure the appointment id belongs to user
            update_appt = Appointment.query \
            .filter(Appointment.id == appointment_id) \
            .filter(or_(Appointment.user_id == current_user.id, Appointment.agent_id == current_user.id)) \
            .first()

            if not update_appt:
                return {"errors": ["Appointment does not exist"]}


            if current_user.agent:
                 # Check agent appointment to see if overlaps
                agent_appt = Appointment.query.filter(
                    Appointment.agent_id == current_user.id, \
                    Appointment.date == date, \
                    Appointment.time == time,
                    Appointment.id != appointment_id)\
                    .first()

                if agent_appt:
                    return {"errors": ["You already have another appointment at this timeslot"]}

                client_appt = Appointment.query.filter(
                    Appointment.user_id == update_appt.user_id, \
                    Appointment.date == date, \
                    Appointment.time == time,
                    Appointment.id != appointment_id)\
                    .first()

                if client_appt:
                    return {"errors": ["Client has another appointment at this timeslot"]}

            else:
                user_appt = Appointment.query.filter(
                    Appointment.user_id == current_user.id, \
                    Appointment.date == date, \
                    Appointment.time == time,
                    Appointment.id != appointment_id)\
                    .first()

                if user_appt:
                    return {"errors": ["You already have another appointment at this timeslot"]}

                agent_appt = Appointment.query.filter(
                    Appointment.user_id == update_appt.agent_id, \
                    Appointment.date == date, \
                    Appointment.time == time,
                    Appointment.id != appointment_id)\
                    .first()

                if agent_appt:
                    return {"errors": ["Agent has another appointment at this timeslot"]}

            # query for to see if it is not avaliable
            exists = Appointment.query.filter(
                Appointment.id != appointment_id,
                Appointment.property_id == property_id, \
                Appointment.date == date, \
                Appointment.time == time)\
                .first()

            if exists:
                return {"errors": ["Timeslot not avaliable"]}


            update_appt.date = date
            update_appt.time = time
            update_appt.message = message

            db.session.commit()
            return {
                "appointment": update_appt.to_dict()
            }


        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

    if request.method == "DELETE":
        appt = Appointment.query.filter(Appointment.id == appointment_id).filter(or_(Appointment.user_id == current_user.id, Appointment.agent_id == current_user.id)).first()

        if appt:
            db.session.delete(appt)
            db.session.commit()
            return {"success": "success"}

        return {'errors': ['Unauthorized']}, 401
