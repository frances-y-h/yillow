from app.models import db, State

def seed_states():
    state1 = State(state="AL")
    state2 = State(state="AK")
    state3 = State(state="AZ")
    state4 = State(state="AR")
    state5 = State(state="CA")
    state6 = State(state="CO")
    state7 = State(state="CT")
    state8 = State(state="DE")
    state9 = State(state="FL")
    state10 = State(state="GA")
    state11 = State(state="HI")
    state12 = State(state="ID")
    state13 = State(state="IL")
    state14 = State(state="IN")
    state15 = State(state="IA")
    state16 = State(state="KS")
    state17 = State(state="KY")
    state18 = State(state="LA")
    state19 = State(state="ME")
    state20 = State(state="MD")
    state21 = State(state="MA")
    state22 = State(state="MI")
    state23 = State(state="MN")
    state24 = State(state="MS")
    state25 = State(state="MO")
    state26 = State(state="MT")
    state27 = State(state="NE")
    state28 = State(state="NV")
    state29 = State(state="NH")
    state30 = State(state="NJ")
    state31 = State(state="NM")
    state32 = State(state="NY")
    state33 = State(state="NC")
    state34 = State(state="ND")
    state35 = State(state="OH")
    state36 = State(state="OK")
    state37 = State(state="OR")
    state38 = State(state="PA")
    state39 = State(state="RI")
    state40 = State(state="SC")
    state41 = State(state="SD")
    state42 = State(state="TN")
    state43 = State(state="TX")
    state44 = State(state="UT")
    state45 = State(state="VT")
    state46 = State(state="VA")
    state47 = State(state="WA")
    state48 = State(state="WV")
    state49 = State(state="WI")
    state50 = State(state="WY")

    db.session.add_all([
        state1, state2, state3, state4, state5, state6, state7,
        state8, state9, state11, state10, state12, state13, state14,
        state15, state16, state17, state18, state19, state20,
        state21, state22, state23, state24, state25, state26,
        state27, state28, state29, state30, state31, state32,
        state33, state34, state35, state36, state37, state38,
        state39, state40, state41, state42, state43, state44,
        state45, state46, state47, state48, state49, state50])
    db.session.commit()

def undo_states():
    db.session.execute('TRUNCATE states RESTART IDENTITY CASCADE;')
    db.session.commit()
