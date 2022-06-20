from flask import Blueprint, jsonify, request
from app.models import Property
from app.models import User

property_routes = Blueprint('properties', __name__)

# @property_routes.route("/search", methods=["GET", 'POST'])
# def search():
#     properties = Property.query.limit(200).all()
#     return {
#         "properties": [property.to_dict() for property in properties],
#         }

@property_routes.route("/<int:property_id>")
def get_property(property_id):

    property = Property.query.get(property_id)

    if property:
        return {"property": property.to_dict()}
    else:
        return {"errors": ["Something went wrong. Please try again"]}

@property_routes.route("/<int:property_id>/images")
def property_imgs(property_id):
    property = Property.query.get(property_id)
    return {
        "images": [image.to_dict() for image in property.images]
    }
