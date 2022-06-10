from app.models import db, State

def seed_states():
    state1 = State(state="AL", long="Alabama")
    state2 = State(state="AK", long="Alaska")
    state3 = State(state="AZ", long="Arizona")
    state4 = State(state="AR", long="Arkansas")
    state5 = State(state="CA", long="California")
    state6 = State(state="CO", long="Colorado")
    state7 = State(state="CT", long="Connecticut")
    state8 = State(state="DE", long="Delaware")
    state9 = State(state="FL", long="Florida")
    state10 = State(state="GA", long="Georgia")
    state11 = State(state="HI", long="Hawaii")
    state12 = State(state="ID", long="Idaho")
    state13 = State(state="IL", long="Illinois")
    state14 = State(state="IN", long="Indiana")
    state15 = State(state="IA", long="Iowa")
    state16 = State(state="KS", long="Kansas")
    state17 = State(state="KY", long="Kentucky")
    state18 = State(state="LA", long="Louisiana")
    state19 = State(state="ME", long="Maine")
    state20 = State(state="MD", long="Maryland")
    state21 = State(state="MA", long="Massachusetts")
    state22 = State(state="MI", long="Michigan")
    state23 = State(state="MN", long="Minnesota")
    state24 = State(state="MS", long="Mississippi")
    state25 = State(state="MO", long="Missouri")
    state26 = State(state="MT", long="Montana")
    state27 = State(state="NE", long="Nebraska")
    state28 = State(state="NV", long="Nevada")
    state29 = State(state="NH", long="New Hampshire")
    state30 = State(state="NJ", long="New Jersey")
    state31 = State(state="NM", long="New Mexico")
    state32 = State(state="NY", long="New York")
    state33 = State(state="NC", long="North Carolina")
    state34 = State(state="ND", long="North Dakota")
    state35 = State(state="OH", long="Ohio")
    state36 = State(state="OK", long="Oklahoma")
    state37 = State(state="OR", long="Oregon")
    state38 = State(state="PA", long="Pennsylvania")
    state39 = State(state="RI", long="Rhode Island")
    state40 = State(state="SC", long="South Carolina")
    state41 = State(state="SD", long="South Dakota")
    state42 = State(state="TN", long="Tennessee")
    state43 = State(state="TX", long="Texas")
    state44 = State(state="UT", long="Utah")
    state45 = State(state="VT", long="Vermont")
    state46 = State(state="VA", long="Virginia")
    state47 = State(state="WA", long="Washington")
    state48 = State(state="WV", long="West Virginia")
    state49 = State(state="WI", long="Wisconsin")
    state50 = State(state="WY", long="Wyoming")

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
