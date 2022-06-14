from sqlalchemy import or_, and_
from flask import Blueprint, jsonify, request
from app.models import Property, State

search_routes = Blueprint('search', __name__)


@search_routes.route("/areas", methods=["POST"])
def search_by_area():
    neLat = float(request.json["neLat"]) # Max lat
    neLng = float(request.json["neLng"]) # Max lng
    swLat = float(request.json["swLat"]) # Min lat
    swLng = float(request.json["swLng"]) # Min lng

    properties = Property.query.filter(Property.lat < neLat, Property.long < neLng, Property.lat > swLat, Property.long > swLng).limit(500).all()

    return {
        "properties": [property.to_dict() for property in properties],
    }

@search_routes.route("/<term>")
def search_by_term(term):

    parsedTerm = " ".join(term.split("-"))

    # exact matche
    street = Property.query.filter(Property.street.ilike(f"{parsedTerm}")).limit(500).all()

    if street:
        return {"properties": [prop.to_dict() for prop in street]}

    results = []

    # search by street
    streets = Property.query.filter(Property.street.ilike(f"%{parsedTerm}%")).limit(500).all()

    if streets:
        results.extend([street.to_dict() for street in streets])

    if len(results) >= 500:
        return {"properties": results}


    # search by city
    properties = Property.query.filter(Property.city.ilike(f"%{parsedTerm}%")).limit(500).all()

    if properties:
        results.extend([street.to_dict() for street in properties])

    if len(results) >= 500:
        return {"properties": results}


    # search by zip
    zips = Property.query.filter(Property.zip.ilike(f"%{parsedTerm}%")).limit(500).all()

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
