from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import current_user
import datetime

class Playlists(db.Model):
    __tablename__ = 'playlists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    creator_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(40), nullable=False)
    image = db.Column(db.String(255), nullable=True, default='/playlist-default.png')
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now())

    playlist_song = db.relationship('PlaylistSongs', backref='playlist', cascade='all, delete-orphan', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'creator_id': self.creator_id,
            'name': self.name,
            'image': self.image, 
            'creator': self.creator.username,
        }