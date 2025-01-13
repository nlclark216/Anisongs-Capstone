from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime

class PlaylistSongs(db.Model):
    __tablename__ = 'playlist_songs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    playlist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('playlists.id')), nullable=False)
    song_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('songs.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now())

    def to_dict(self):
        return {
            'id': self.id,
            'playlist_id': self.playlist_id,
            'song_id': self.song_id,
            'playlist': self.playlist.to_dict() if self.playlist else None,
            'song': self.song.to_dict() if self.song else None
        }