from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy import and_
from app.models import Playlists, db, PlaylistSongs
from app.forms import PlaylistForm, PlaylistSongsForm

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

@playlist_routes.route('/<int:id>', methods=['POST'])
@login_required
def add_song(id):
    """
    Query for a playlist by id, adds song and returns that playlist in a dictionary
    """
    playlist = Playlists.query.get(id)

    if not playlist:
        return { 'message': 'Playlist not found' }
    
    if playlist.creator_id != current_user.id:
        return jsonify({'message': 'Forbidden'}), 403
    
    
    form = PlaylistSongsForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_song = PlaylistSongs(
            added_by=current_user.id,
            playlist_id=id,
            song_id=form.data['song_id']
        )
        db.session.add(new_song)
        db.session.commit()
        return new_song.to_dict(), 201
    return form.errors, 401
    


@playlist_routes.route('/<int:id>/songs')
@login_required
def playlist_songs(id):
    """
    Query for a playlist by id and returns the songs from that playlist in a dictionary
    """
    playlist = Playlists.query.get(id)

    if not playlist:
        return jsonify({'message': 'Playlist not found'}), 404
    
    songs = PlaylistSongs.query.filter(PlaylistSongs.playlist_id == id)

    if not songs:
        return jsonify({'message': 'No songs found'}), 404
    
    if len([song.to_dict() for song in songs]) < 1:
        return jsonify({ 'message': 'No songs found' }), 404
    
    return [song.to_dict() for song in songs] 

@playlist_routes.route('/<int:id>/songs/<int:song_id>')
@login_required
def playlist_song(id, song_id):
    """
    Query for a playlist by id and returns the song
    that matches the provided song id
    """
    song = PlaylistSongs.query.filter(and_(PlaylistSongs.song_id == song_id, PlaylistSongs.playlist_id == id)).first()
    if not song:
        return jsonify({'message': 'Song not found'}), 404
    
    if song.added_by != current_user.id:
        return jsonify({'message': 'Forbidden'}), 403
    return song.to_dict()

@playlist_routes.route('/<int:id>/songs/<int:song_id>', methods=['DELETE'])
@login_required
def delete_playlist_song(id, song_id):
    """
    Query for a playlist by id and returns the songs from that playlist in a dictionary
    """
    playlist = Playlists.query.get(id)

    if not playlist:
        return jsonify({ 'message': 'Playlist not found' }), 404
    
    if playlist.creator_id != current_user.id:
        return jsonify({'message': 'Forbidden'}), 403
    
    song = PlaylistSongs.query.filter(PlaylistSongs.song_id == song_id).first()
    if not song:
        return jsonify({'message': 'Song not found'}), 404
    if song.added_by != current_user.id:
        return jsonify({'message': 'Forbidden'}), 403
    
    if song:
        db.session.delete(song)
        db.session.commit()
        return jsonify({'message': "Successfully deleted"}), 204

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
        jsonify({'message': "Successfully deleted"}), 204