from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime

class Songs(db.Model):
    __tablename__ = 'songs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String(50), nullable=False)
    artist = db.Column(db.String(50), nullable=False)
    song_file = db.Column(db.String, nullable=False)
    song_img = db.Column(db.String, nullable=True, default='/song-default.png')
    anime = db.Column(db.String(200), nullable=False)
    album_name = db.Column(db.String(200), nullable=False)
    album_art = db.Column(db.String, nullable=True, default='/album-img.png')
    year = db.Column(db.Integer, nullable=False)
    language = db.Column(db.String, nullable=True, default='Japanese')
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now())

    likes = db.relationship('Likes', backref='song', cascade='all, delete-orphan', lazy=True)
    playlists = db.relationship('PlaylistSongs', backref='songs', cascade='all, delete-orphan', lazy=True)


    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'title': self.title,
            'artist': self.artist,
            'song_file': self.song_file,
            'song_img': self.song_img,
            'anime': self.anime,
            'album_art': self.album_art,
            'year': self.year,
            'language': self.language,
            'owner': self.owner.to_dict() if self.owner else None,
            'likes': self.likes.to_dict() if self.likes else None,
            'playlists': self.playlists.to_dict() if self.playlists else None
        }