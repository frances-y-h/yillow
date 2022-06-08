from flask import Blueprint, jsonify, request
from app.models import Property
from app.models import User

property_routes = Blueprint('properties', __name__)

@property_routes.route("/search", methods=["GET", 'POST'])
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
    properties = Property.query.all()
    return {
        "properties": [property.to_dict() for property in properties],
        }

@property_routes.route("/<int:property_id>/images")
def property_imgs(property_id):
    property = Property.query.get(property_id)
    return {
        "images": [image.to_dict() for image in property.images]
    }
