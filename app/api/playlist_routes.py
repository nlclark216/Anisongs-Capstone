from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Playlists, db
from app.forms import PlaylistForm

playlist_routes = Blueprint('playlists', __name__)

@playlist_routes.route('/')
@login_required
def playlists():
    """
    Query for all playlists and returns them in a list of playlist dictionaries
    """
    playlists = Playlists.query.all()

    if not playlists:
        return { 'message': 'No playlists found' }
    
    return {'playlists': [playlist.to_dict() for playlist in playlists]}

@playlist_routes.route('/current')
@login_required
def created_playlists():
    """
    Query for all playlists user created and returns them in a list of playlist dictionaries
    """
    playlists = Playlists.query.filter(Playlists.creator_id == current_user.get_id())

    if not playlists:
        return { 'message': 'No playlists found' }
    
    return {'playlists': [playlist.to_dict() for playlist in playlists]}

@playlist_routes.route('/', methods=['POST'])
@login_required
def create_playlist():
    """
    Creates a new playlist
    """
    form = PlaylistForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        playlist = Playlists(
            creator_id=current_user.get_id(),
            name=form.data['name'],
            image=form.data['image']
        )
        db.session.add(playlist)
        db.session.commit()
        return playlist.to_dict(), 201
    return form.errors, 401

@playlist_routes.route('/<int:id>')
@login_required
def playlist(id):
    """
    Query for a playlist by id and returns that playlist in a dictionary
    """
    playlist = Playlists.query.get(id)

    if not playlist:
        return { 'message': 'Playlist not found' }
    
    return playlist.to_dict()

@playlist_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_playlist(id):
    """
    Update a playlist's information by id
    """
    data = request.get_json()
    playlist = Playlists.query.get(id)

    if not playlist:
        return jsonify({'message': 'Playlist not found.'}), 404
    if playlist.creator_id != current_user.id:
        return jsonify({'message': 'Forbidden'}), 403
    
    playlist.name = data.get('name', playlist.name)
    playlist.image = data.get('image', playlist.image)

    db.session.commit()
    return playlist.to_dict()

@playlist_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_playlist(id):
    """
    Delete a playlist's information by id
    """
    playlist = Playlists.query.get(id)
    if not playlist:
        return jsonify({'message': 'Playlist not found'}), 404
    if playlist.creator_id != current_user.id:
        return jsonify({'message': 'Forbidden'}), 403
    
    if playlist:
        db.session.delete(playlist)
        db.session.commit()
        return { 'message': "Successfully deleted" }