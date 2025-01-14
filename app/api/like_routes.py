from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Likes, db

like_routes = Blueprint('likes', __name__)

@like_routes.route('/')
@login_required
def likes():
    """
    Query for all likes and returns them in a list of like dictionaries
    """
    likes = Likes.query.all()

    if not likes:
        return jsonify({'message': 'Like not found'}), 404
    
    return jsonify({'likes': [like.to_dict() for like in likes]}), 200

@like_routes.route('/current')
@login_required
def created_likes():
    """
    Query for all likes user created and returns them in a list of like dictionaries
    """
    likes = Likes.query.filter(Likes.owner_id == current_user.get_id())

    if not likes:
        return jsonify({'message': 'Like not found'}), 404
    
    return jsonify({'likes': [like.to_dict() for like in likes]}), 200

@like_routes.route('/<int:id>')
@login_required
def like(id):
    """
    Query for a like by id and returns that like in a dictionary
    """
    like = Likes.query.get(id)

    if not like:
        return jsonify({'message': 'Like not found'}), 404
    return like.to_dict(), 200

@like_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_like(id):
    """
    Query for a like by id and deletes that like
    """
    like = Likes.query.get(id)
    if not like:
        return jsonify({'message': 'Like not found'}), 404
    if like.owner_id != current_user.id:
        return jsonify({'message': 'Forbidden'}), 403

    db.session.delete(like)
    db.session.commit()
    return {'message': "Successfully deleted"}