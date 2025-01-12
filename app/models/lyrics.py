from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime

class Lyrics(db.Model):
    __tablename__ = 'lyrics'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    creator_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), nullable=False))
    song_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('songs.id'), nullable=False))
    type = db.Column(db.String(40), nullable=False)
    lyrics = db.Column(db.String(4000), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now())

    def to_dict(self):
        return {
            'id': self.id,
            'creator_id': self.creator_id,
            'song_id': self.song_id,
            'type': self.type,
            'lyrics': self.lyrics,
            'user': self.user.to_dict(),
            'song': self.song.to_dict()
        }