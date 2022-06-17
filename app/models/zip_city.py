from .db import db

class ZipCity(db.Model):
    __tablename__ = 'zip_cities'

    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String(50), nullable=False)
    zip = db.Column(db.String(5), nullable=False)
    state_id = db.Column(db.Integer, db.ForeignKey("state.id"), nullable=False)

    state = db.relationship("State", back_populates="zip")
