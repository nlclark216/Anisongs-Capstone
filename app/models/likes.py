from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import current_user
import datetime

class Likes(db.Model):
    __tablename__ = 'likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    song_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('songs.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now())

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'song_id': self.song_id,
            'owner': (self.owner.username) if self.owner_id != current_user.id else 'Current User',
            'song': {'title': self.song.title,
                      'anime': self.song.anime, 
                      'artist': self.song.artist, 
                      'year': self.song.year, 
                      'language': self.song.language} if self.song else None  
        }