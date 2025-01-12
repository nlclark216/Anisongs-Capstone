from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime

class Likes(db.Model):
    __tablename__ = 'likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)