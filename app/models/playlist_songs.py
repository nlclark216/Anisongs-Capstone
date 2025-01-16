from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime

class PlaylistSongs(db.Model):
    __tablename__ = 'playlist_songs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    added_by = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    playlist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('playlists.id')), nullable=False)
    song_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('songs.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now())
    

    def to_dict(self):
        return {
            'id': self.id,
            'added_by': self.added_by,
            'playlist_id': self.playlist_id,
            'song_id': self.song_id,
            'added_by': self.added_by if self.added_by else None,
            'playlist': {'name': self.playlist.name, 'creator': self.playlist.creator.username} if self.playlist else None,
            'song': {'ownerId': self.song.owner_id, 'title': self.song.title, 'artist': self.song.artist, 'album': self.song.album_name, 'albumArt': self.song.album_art, 'likes': [{'ownerId': self.song.like.owner_id} for self.song.like in self.song.likes]} if self.song else None
        }