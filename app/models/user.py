from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import datetime


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    city = db.Column(db.String(40), nullable=False)
    state = db.Column(db.String(40), nullable=True)
    address = db.Column(db.String(255), nullable=True)
    country = db.Column(db.String(40), nullable=True)
    profile_pic = db.Column(db.String(255), nullable=True, default='/profile-pic.png')
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now())

    songs = db.relationship('Songs', backref='owner', cascade='all, delete-orphan', lazy=True)
    playlists = db.relationship('Playlists', backref='creator', cascade='all, delete-orphan', lazy=True)
    likes = db.relationship('Likes', backref='owner', cascade='all, delete-orphan', lazy=True)
    lyrics = db.relationship('Lyrics', backref='creator', cascade='all, delete-orphan', lazy=True)
    # playlist_songs = db.relationship('PlaylistSongs', backref='added_by', cascade='all, delete-orphan', lazy=True)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'city': self.city,
            'state': self.state,
            'address': self.address,
            'country': self.country,
            'profile_pic': self.profile_pic,
            'created_at': self.created_at,
            'updated_at': self.updated_at
            # 'songs': self.songs.to_dict() if self.songs else None,
            # 'likes': self.likes.to_dict() if self.likes else None,
            # 'playlists': self.playlists.to_dict() if self.playlists else None,
            # 'lyrics': self.lyrics.to_dict() if self.lyrics else None 
        }
