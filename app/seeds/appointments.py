from app.models import db, Appointment
from datetime import datetime

def seed_appointments():
    appointment1 = Appointment(agent_id=4, user_id=1, property_id=1, appointment=datetime(2022, 6, 10, 12, 15), message="I am interested to tour this house")
    appointment2 = Appointment(agent_id=5, user_id=2, property_id=2, appointment=datetime(2022, 6, 10, 12, 15), message="I am interested to tour this house")
    appointment3 = Appointment(agent_id=6, user_id=3, property_id=3, appointment=datetime(2022, 6, 10, 12, 15), message="I am interested to tour this house")
    appointment4 = Appointment(agent_id=7, user_id=1, property_id=4, appointment=datetime(2022, 6, 10, 12, 45), message="I am interested to tour this house")
    appointment5 = Appointment(agent_id=8, user_id=2, property_id=5, appointment=datetime(2022, 6, 10, 12, 45), message="I am interested to tour this house")
    appointment6 = Appointment(agent_id=9, user_id=3, property_id=6, appointment=datetime(2022, 6, 10, 12, 45), message="I am interested to tour this house")
    appointment7 = Appointment(agent_id=10, user_id=1, property_id=7, appointment=datetime(2022, 6, 10, 13, 15), message="I am interested to tour this house")
    appointment8 = Appointment(agent_id=11, user_id=2, property_id=8, appointment=datetime(2022, 6, 10, 13, 15), message="I am interested to tour this house")
    appointment9 = Appointment(agent_id=12, user_id=3, property_id=9, appointment=datetime(2022, 6, 10, 13, 15), message="I am interested to tour this house")
    appointment10 = Appointment(agent_id=13, user_id=1, property_id=10, appointment=datetime(2022, 6, 10, 13, 45), message="I am interested to tour this house")
    appointment11 = Appointment(agent_id=14, user_id=2, property_id=11, appointment=datetime(2022, 6, 10, 13, 45), message="I am interested to tour this house")
    appointment12 = Appointment(agent_id=15, user_id=3, property_id=12, appointment=datetime(2022, 6, 10, 13, 45), message="I am interested to tour this house")
    appointment13 = Appointment(agent_id=16, user_id=1, property_id=13, appointment=datetime(2022, 6, 10, 14, 15), message="I am interested to tour this house")
    appointment14 = Appointment(agent_id=17, user_id=2, property_id=14, appointment=datetime(2022, 6, 10, 14, 15), message="I am interested to tour this house")
    appointment15 = Appointment(agent_id=18, user_id=3, property_id=15, appointment=datetime(2022, 6, 10, 14, 15), message="I am interested to tour this house")
    appointment16 = Appointment(agent_id=4, user_id=1, property_id=16, appointment=datetime(2022, 6, 10, 14, 30), message="I am interested to tour this house")
    appointment17 = Appointment(agent_id=5, user_id=2, property_id=17, appointment=datetime(2022, 6, 10, 14, 30), message="I am interested to tour this house")
    appointment18 = Appointment(agent_id=6, user_id=3, property_id=18, appointment=datetime(2022, 6, 10, 14, 30), message="I am interested to tour this house")
    appointment19 = Appointment(agent_id=7, user_id=1, property_id=19, appointment=datetime(2022, 6, 10, 15, 15), message="I am interested to tour this house")
    appointment20 = Appointment(agent_id=8, user_id=2, property_id=20, appointment=datetime(2022, 6, 10, 15, 15), message="I am interested to tour this house")

    db.session.add_all([appointment1, appointment2, appointment3, appointment4, appointment5, appointment6, appointment7, appointment8, appointment9, appointment10, appointment11, appointment12, appointment13, appointment14, appointment15, appointment16, appointment17, appointment18, appointment19, appointment20])
    db.session.commit()

def undo_appointments():
    db.session.execute('TRUNCATE appointments RESTART IDENTITY CASCADE;')
    db.session.commit()
