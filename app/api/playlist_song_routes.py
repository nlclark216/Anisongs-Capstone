from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import PlaylistSongs, Songs, db

playlist_song_routes = Blueprint('playlist_songs', __name__)

@playlist_song_routes.route('/')
@login_required
def playlist_songs():
    """
    Query for all playlist songs and returns them in a list of playlist song dictionaries
    """
    playlist_songs = PlaylistSongs.query.all()

    if not playlist_songs:
        return { 'message': 'No songs found' }

    return [playlist_song.to_dict() for playlist_song in playlist_songs]

@playlist_song_routes.route('/current')
@login_required
def user_playlist_songs():
    """
    Query for all playlist songs belonging to current user and returns them in a list of playlist song dictionaries
    """
    playlist_songs = PlaylistSongs.query.filter(PlaylistSongs.added_by == current_user.id)

    if not playlist_songs:
        return { 'message': 'No songs found' }
    
    if playlist_songs:
        return {'playlist_songs': [playlist_song.to_dict() for playlist_song in playlist_songs]}


@playlist_song_routes.route('/<int:id>')
@login_required
def playlist_song(id):
    """
    Query for a playlist song by id and returns that playlist song in a dictionary
    """
    playlist_song = PlaylistSongs.query.get(id)

    if not playlist_song:
        return { 'message': 'No song found' }

    return playlist_song.to_dict()


@playlist_song_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_playlist_song(id):
    """
    Query for a playlist song by id and deletes that playlist song
    """
    playlist_song = PlaylistSongs.query.filter(PlaylistSongs.song_id == id).first()

    if not playlist_song:
        return jsonify({'message': 'Song not found'}), 404

    if playlist_song.added_by != current_user.id:
        return jsonify({'message': 'Forbidden'}), 403
    
    if playlist_song:
        db.session.delete(playlist_song)
        db.session.commit()
        return { 'message': "Successfully deleted" }