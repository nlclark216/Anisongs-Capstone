from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Songs

song_routes = Blueprint('songs', __name__)

@song_routes.route('/')
def songs():
    """
    Query for all songs and returns them in a list of song dictionaries
    """
    songs = Songs.query.all()
    
    if not songs:
        return {
            'message': 'No songs found'
        }

    return {'songs': [song.to_dict() for song in songs]}

@song_routes.route('/<int:id>')
def song(id):
    """
    Query for a song by id and returns that song in a dictionary
    """
    song = Songs.query.get(id)

    if not song:
        return {
            'message': 'No song found'
        }
    
    return song.to_dict()