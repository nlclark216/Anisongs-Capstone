from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Playlists

playlist_routes = Blueprint('playlists', __name__)

@playlist_routes.route('/')
def playlists():
    """
    Query for all playlists and returns them in a list of playlist dictionaries
    """
    playlists = Playlists.query.all()
    return {'playlists': [playlist.to_dict() for playlist in playlists]}

@playlist_routes.route('/<int:id>')
def playlist(id):
    """
    Query for a playlist by id and returns that playlist in a dictionary
    """
    playlist = Playlists.query.get(id)
    return playlist.to_dict()