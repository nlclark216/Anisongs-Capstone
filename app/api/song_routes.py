from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Songs, db
from app.forms import SongForm

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

@song_routes.route('/current')
def owned_songs():
    """
    Query for all songs owned by current user and returns them in a list of song dictionaries
    """
    songs = Songs.query.filter(Songs.owner_id == current_user.get_id())
    
    if not songs:
        return {
            'message': 'No songs found'
        }

    return {'songs': [song.to_dict() for song in songs]}

@song_routes.route('/', methods=['POST'])
@login_required
def create_song():
    """
    Creates a new song
    """
    form = SongForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        song = Songs(
            owner_id=current_user.get_id(),
            title=form.data['title'],
            artist=form.data['artist'],
            song_file=form.data['song_file'],
            song_img=form.data['song_img'],
            anime=form.data['anime'],
            album_name=form.data['album_name'],
            album_art=form.data['album_art'],
            year=form.data['year'],
            language=form.data['language'],
        )
        db.session.add(song)
        db.session.commit()
        return song.to_dict(), 201
    return form.errors, 401
    

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

@song_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_song(id):
    """
    Update a song's information by id
    """
    data = request.get_json()
    song = Songs.query.get(id)

    if not song:
        return jsonify({'message': 'Song not found.'}), 404
    if song.owner_id != current_user.id:
        return jsonify({'message': 'Forbidden'}), 403
    
    song.title = data.get('title', song.title)
    song.artist = data.get('artist', song.artist)
    song.song_file = data.get('song_file', song.song_file)
    song.song_img = data.get('song_img', song.song_img)
    song.anime = data.get('anime', song.anime)
    song.album_name = data.get('album_name', song.album_name)
    song.album_art = data.get('album_art', song.album_art)
    song.year = data.get('year', song.year)
    song.language = data.get('language', song.language)

    db.session.commit()
    return song.to_dict()

@song_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_song(id):
    """
    Deletes song by id
    """
    song = Songs.query.get(id)
    if not song:
        return jsonify({'message': 'Song not found'}), 404
    if song.owner_id != current_user.id:
        return jsonify({'message': 'Forbidden'}), 403

    if song:
        db.session.delete(song)
        db.session.commit()
        return { 'message': "Successfully deleted" }