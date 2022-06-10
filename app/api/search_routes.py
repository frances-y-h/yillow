from flask import Blueprint, jsonify, request
from app.models import Property, State

search_routes = Blueprint('search', __name__)

@search_routes.route("/", methods=["GET","POST"])
def search():
    # searchParam = request.json["search"]

    # if len(searchParam) < 3:
    #     properties = Property.query.limit(200).all()
    #     return {
    #         "properties": [property.to_dict() for property in properties],
    #         }
    # else:
    #     properties = Property.query.filter(Property.city.ilike(f'%{searchParam}%')).limit(200).all()
    #     if len(properties) == 0:
    #         properties = Property.query.filter(Property.city.ilike(f'%{searchParam[0:2]}%')).limit(200).all()
    #         return {
    #             "properties": [property.to_dict() for property in properties],
    #             }
    #     return {
    #         "properties": [property.to_dict() for property in properties],
    #         }
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
