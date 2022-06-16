from .db import db
from .property import Property

class AgentArea(db.Model):
    __tablename__ = "agent_areas"

    id = db.Column(db.Integer, primary_key=True)
    agent_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    zip = db.Column(db.String(5), nullable=False)

    agent = db.relationship("User", back_populates="areas")

    def city(self):
        properties = Property.query.filter(Property.zip == self.zip).all()
        cities = [property.city for property in properties]
        uniqueCities = list(set(cities))
        if not uniqueCities:
            uniqueCities = ["No matching city in database"]
        return {"zip": self.zip, "cities": uniqueCities}
