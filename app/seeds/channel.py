from app.models import db, Channel

def seed_channel():
    channel1 = Channel(user_id=1, agent_id=4)
    channel2 = Channel(user_id=1, agent_id=5)
    channel3 = Channel(user_id=1, agent_id=6)

    db.session.add_all([channel1, channel2, channel3])
    db.session.commit()

def undo_channel():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()
