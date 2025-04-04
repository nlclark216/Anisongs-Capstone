from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import current_user
import datetime

class Lyrics(db.Model):
    __tablename__ = 'lyrics'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    creator_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    song_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('songs.id')), nullable=False)
    type = db.Column(db.String(40), nullable=False)
    lyrics = db.Column(db.String, nullable=False)
    translation = db.Column(db.String, nullable=True)
    translation_language = db.Column(db.String, nullable=True, default='English')
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now())

    def to_dict(self):
        return {
            'id': self.id,
            'creator_id': self.creator_id,
            'song_id': self.song_id,
            'type': self.type,
            'lyrics': self.lyrics,
            'translation': self.translation,
            'translation_language': self.translation_language,
            'creator': (self.creator.username) if self.creator_id != current_user.id else 'Current User',
            'song': {
                'title': self.song.title, 
                'anime': self.song.anime, 
                'artist': self.song.artist, 
                'year': self.song.year, 
                'language': self.song.language
                } if self.song else None 
        }