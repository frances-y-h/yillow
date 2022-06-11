from sqlalchemy import or_
from flask import Blueprint, jsonify, request
from app.models import Property, State

search_routes = Blueprint('search', __name__)




@search_routes.route("/<term>")
def search_by_term(term):
    parsedTerm = " ".join(term.split("-"))

    results = []

    # search by city
    properties = Property.query.filter(Property.city.ilike(f"%{parsedTerm}%")).all()

    if properties:
        print("************city")
        results.extend([property.to_dict() for property in properties])

    # search by zip
    zips = Property.query.filter(Property.zip.ilike(f"%{parsedTerm}%")).all()

    if zips:
        print("************zip")
        results.extend([property.to_dict() for property in zips])

    # search by state
    states = Property.query.join(State).filter(State.long.ilike(f"%{parsedTerm}%")).all()

    if states:
        print("************states")
        results.extend([property.to_dict() for property in states])

    # search by street
    split = term.split("-")
    st_num = split[0]
    st_name = " ".join(split[1:])
    streets = Property.query.filter(or_(Property.st_num.ilike(f"{st_num}%"), Property.st_name.ilike(f"%{st_name}%"))).all()

    if streets:
        print("************streets")
        results.extend([property.to_dict() for property in streets])

    # search by street name
    street = Property.query.filter(Property.st_name.ilike(f"%{parsedTerm}%")).all()

    if street:
        print("************street")
        results.extend([property.to_dict() for property in street])

    return {"properties": results}


@search_routes.route("/")
def search():
    properties = Property.query.limit(200).all()
    return {
        "properties": [property.to_dict() for property in properties],
        }

@search_routes.route("/terms", methods=["GET"])
def search_terms():
    properties = Property.query.all()
    allStates = State.query.all()
    addresses = [property.st_num+" "+property.st_name.strip() for property in properties]
    states = [state.long for state in allStates]
    cities = [property.city for property in properties]
    zip = [property.zip for property in properties]
    terms = set(cities + zip + states + addresses)
    sort = sorted(list(terms), key=str.casefold)

    return {"terms": sort}
