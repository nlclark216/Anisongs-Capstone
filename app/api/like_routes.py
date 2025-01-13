from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Likes

like_routes = Blueprint('likes', __name__)

@like_routes.route('/')
@login_required
def likes():
    """
    Query for all likes and returns them in a list of like dictionaries
    """
    likes = Likes.query.all()

    if not likes:
        return {
            'message': 'No likes found'
        }
    
    return {'likes': [like.to_dict() for like in likes]}

@like_routes.route('/<int:id>')
@login_required
def like(id):
    """
    Query for a like by id and returns that like in a dictionary
    """
    like = Likes.query.get(id)

    if not like:
        return {
            'message': 'No like found'
        }
    
    return like.to_dict()