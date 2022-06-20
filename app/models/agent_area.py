from .db import db
from .property import Property
from .zip_city import ZipCity

class AgentArea(db.Model):
    __tablename__ = "agent_areas"

    id = db.Column(db.Integer, primary_key=True)
    agent_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    zip = db.Column(db.String(5), nullable=False)

    agent = db.relationship("User", back_populates="areas")

    def city(self):
        cities = ZipCity.query.filter(ZipCity.zip == self.zip).all()
        cities_lst = [city.city for city in cities]

        if not cities_lst:
            properties = Property.query.filter(Property.zip == self.zip).all()
            more_cities = [property.city for property in properties]
            cities_lst = list(set(more_cities))
            if not cities_lst:
                cities_lst = ["No matching city in database"]

        return {"zip": self.zip, "cities": cities_lst}
