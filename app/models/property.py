from .db import db
from .property_img import PropertyImg

class Property(db.Model):
    __tablename__ = "properties"

    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String(20),nullable=False)
    st_num = db.Column(db.String(255),nullable=False)
    st_name = db.Column(db.String(100),nullable=False)
    city = db.Column(db.String(255),nullable=False)
    state_id = db.Column(db.Integer, db.ForeignKey("states.id"), nullable=False)
    zip = db.Column(db.String(5), nullable=False)
    type = db.Column(db.String(20), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    bed = db.Column(db.Integer, nullable=False)
    bath = db.Column(db.Float, nullable=False)
    sqft = db.Column(db.Integer, nullable=False)
    lot = db.Column(db.Integer, nullable=False)
    listing_id = db.Column(db.String(50), nullable=False)
    listing_date = db.Column(db.Date, nullable=False)
    description = db.Column(db.String(2000))
    listing_agent_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    lat = db.Column(db.Float, nullable=False)
    long = db.Column(db.Float, nullable=False)
    front_img = db.Column(db.String)

    state = db.relationship("State", back_populates="properties")
    listing_agent = db.relationship("User", back_populates="properties")
    images = db.relationship("PropertyImg", back_populates="property")
    appointments = db.relationship("Appointment", back_populates="property")

    def to_dict(self):
        return {
            "id": self.id,
            "status": self.status,
            "st_num": self.st_num,
            "st_name": self.st_name,
            "city": self.city,
            "state": self.state.state,
            "zip": self.zip,
            "type": self.type,
            "price": self.price,
            "bed": self.bed,
            "bath": self.bath,
            "sqft": self.sqft,
            "lot": self.lot,
            "listing_id": self.listing_id,
            "listing_date": self.listing_date.isoformat(),
            "description": self.description,
            "listing_agent_id": self.listing_agent_id,
            "office": self.listing_agent.office,
            "front_img": self.front_img,
            "images": [image.id for image in self.images],
            "appintments": [appointment.appointment.isoformat() for appointment in self.appointments]
        }
