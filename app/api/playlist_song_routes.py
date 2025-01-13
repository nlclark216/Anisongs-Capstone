from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import PlaylistSongs

playlist_song_routes = Blueprint('playlist_songs', __name__)

@playlist_song_routes.route('/')
@login_required
def playlist_songs():
    """
    Query for all playlist songs and returns them in a list of playlist song dictionaries
    """
    playlist_songs = PlaylistSongs.query.all()

    if not playlist_songs:
        return {
            'message': 'No items found'
        }

    return {'playlist_songs': [playlist_song.to_dict() for playlist_song in playlist_songs]}

@playlist_song_routes.route('/<int:id>')
@login_required
def playlist_song(id):
    """
    Query for a playlist song by id and returns that playlist song in a dictionary
    """
    playlist_song = PlaylistSongs.query.get(id)

    if not playlist_song:
        return {
            'message': 'No item found'
        }

    return playlist_song.to_dict()