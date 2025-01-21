from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import current_user
import datetime

class Files(db.Model):
    __tablename__ = 'files'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    song_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('songs.id')), nullable=False)
    file = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now())

    def to_dict(self):
        return {
            'id': self.id,
            'ownerId': self.owner_id,
            'songId': self.song_id,
            'file': self.file,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
            'owner': self.owner.username if self.owner_id != current_user.id else 'Current User',
            'song': self.song.title if self.song else None 
        }