from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Lyrics

lyric_routes = Blueprint('lyrics', __name__)

@lyric_routes.route('/')
@login_required
def lyrics():
    """
    Query for all lyrics and returns them in a list of lyric dictionaries
    """
    lyrics = Lyrics.query.all()
    return {'lyrics': [lyric.to_dict() for lyric in lyrics]}


@lyric_routes.route('/<int:id>')
@login_required
def lyric(id):
    """
    Query for a lyric by id and returns that lyric in a dictionary
    """
    lyric = Lyrics.query.get(id)

    if not lyric:
        return { 'message': 'Lyrics not found'}
    
    return lyric.to_dict()