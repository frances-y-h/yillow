from app.models import db, Appointment
# from datetime import datetime

# Seeding in GMT, which is PDT + 7
def seed_appointments():
    appointment1 = Appointment(agent_id=4, user_id=1, property_id=1, date="2022-6-11", time="12:00",  message="I am interested to tour this house")
    appointment2 = Appointment(agent_id=5, user_id=2, property_id=2, date="2022-6-11", time="12:00", message="I am interested to tour this house")
    appointment3 = Appointment(agent_id=6, user_id=3, property_id=3, date="2022-6-11", time="12:00", message="I am interested to tour this house")
    appointment4 = Appointment(agent_id=7, user_id=1, property_id=4, date="2022-6-12", time="12:30", message="I am interested to tour this house")
    appointment5 = Appointment(agent_id=8, user_id=2, property_id=5, date="2022-6-11", time="12:30", message="I am interested to tour this house")
    appointment6 = Appointment(agent_id=9, user_id=3, property_id=6, date="2022-6-11", time="12:30", message="I am interested to tour this house")
    appointment7 = Appointment(agent_id=10, user_id=1, property_id=7, date="2022-6-13", time="13:00", message="I am interested to tour this house")
    appointment8 = Appointment(agent_id=11, user_id=2, property_id=8, date="2022-6-11", time="13:00", message="I am interested to tour this house")
    appointment9 = Appointment(agent_id=12, user_id=3, property_id=9, date="2022-6-11", time="13:00", message="I am interested to tour this house")
    appointment10 = Appointment(agent_id=13, user_id=1, property_id=10, date="2022-6-14", time="13:30", message="I am interested to tour this house")
    appointment11 = Appointment(agent_id=14, user_id=2, property_id=11, date="2022-6-11", time="13:30", message="I am interested to tour this house")
    appointment12 = Appointment(agent_id=15, user_id=3, property_id=12, date="2022-6-15", time="13:30", message="I am interested to tour this house")
    appointment13 = Appointment(agent_id=16, user_id=1, property_id=13, date="2022-6-11", time="14:00", message="I am interested to tour this house")
    appointment14 = Appointment(agent_id=17, user_id=2, property_id=14, date="2022-6-16", time="14:00", message="I am interested to tour this house")
    appointment15 = Appointment(agent_id=18, user_id=3, property_id=15, date="2022-6-11", time="14:00", message="I am interested to tour this house")
    appointment16 = Appointment(agent_id=4, user_id=1, property_id=16, date="2022-6-11", time="14:30", message="I am interested to tour this house")
    appointment17 = Appointment(agent_id=5, user_id=2, property_id=17, date="2022-6-11", time="14:30", message="I am interested to tour this house")
    appointment18 = Appointment(agent_id=6, user_id=3, property_id=18, date="2022-6-11", time="14:30", message="I am interested to tour this house")
    appointment19 = Appointment(agent_id=7, user_id=1, property_id=19, date="2022-6-11", time="15:00", message="I am interested to tour this house")
    appointment20 = Appointment(agent_id=8, user_id=2, property_id=20, date="2022-6-11", time="15:00", message="I am interested to tour this house")

    db.session.add_all([appointment1, appointment2, appointment3, appointment4, appointment5, appointment6, appointment7, appointment8, appointment9, appointment10, appointment11, appointment12, appointment13, appointment14, appointment15, appointment16, appointment17, appointment18, appointment19, appointment20])
    db.session.commit()

def undo_appointments():
    db.session.execute('TRUNCATE appointments RESTART IDENTITY CASCADE;')
    db.session.commit()
