from sqlalchemy import or_, and_
from flask import Blueprint, jsonify, request
from app.models import Property, State

search_routes = Blueprint('search', __name__)


@search_routes.route("/<term>")
def search_by_term(term):

    parsedTerm = " ".join(term.split("-"))

    # exact matche
    street = Property.query.filter(Property.street.ilike(f"{parsedTerm}")).all()

    if street:
        return {"properties": [prop.to_dict() for prop in street]}

    results = []

    # search by street
    streets = Property.query.filter(Property.street.ilike(f"%{parsedTerm}%")).all()

    if streets:
        results.extend([street.to_dict() for street in streets])


    # search by city
    properties = Property.query.filter(Property.city.ilike(f"%{parsedTerm}%")).all()

    if properties:
        results.extend([street.to_dict() for street in properties])


    # search by zip
    zips = Property.query.filter(Property.zip.ilike(f"%{parsedTerm}%")).all()

    if zips:
        results.extend([property.to_dict() for property in zips])

    if results:
        return {"properties": results}

    return {"properties": []}


@search_routes.route("/terms", methods=["GET"])
def search_terms():
    properties = Property.query.all()
    addresses = [property.street for property in properties]
    cities = [property.city for property in properties]
    zip = [property.zip for property in properties]
    terms = set(cities + zip + addresses)
    sort = sorted(list(terms), key=str.casefold)

    return {"terms": sort}
