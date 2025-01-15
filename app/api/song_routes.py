from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy import and_
from app.models import Songs, db, Lyrics, PlaylistSongs, Likes
from app.forms import SongForm, LyricsForm, LikesForm

song_routes = Blueprint('songs', __name__)

@song_routes.route('/')
def songs():
    """
    Query for all songs and returns them in a list of song dictionaries
    """

    songs = Songs.query.all()

    return {'songs': [
        {
            'id': song.id,
            "owner_id": song.owner_id,
            'title': song.title,
            'artist': song.artist,
            'file': song.song_file,
            'song_img': song.song_img,
            'anime': song.anime,
            'album_art': song.album_art,
            'year': song.year,
            'language': song.language
         } for song in songs]}, 200

@song_routes.route('/current')
@login_required
def owned_songs():
    """
    Query for all songs owned by current user and returns them in a list of song dictionaries
    """
    songs = Songs.query.filter(Songs.owner_id == current_user.get_id())
    
    if not songs:
        return jsonify({'message': 'No songs found'}), 404

    return {'songs': [song.to_dict() for song in songs]}, 200


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
        return { 'message': 'No song found' }
    
    return song.to_dict(), 200

@song_routes.route('/<int:id>/lyrics')
def song_lyrics(id):
    """
    Query for a song by id and returns the lyrics of song in a dictionary
    """
    song = Songs.query.get(id)

    if not song:
        return jsonify({'message': 'Song not found'}), 404
    
    lyrics = Lyrics.query.filter(Lyrics.song_id == id).first()

    if not lyrics:
        return { 'message': 'No lyrics found' }
    
    return lyrics.to_dict(), 200

@song_routes.route('/<int:id>/playlists')
def song_playlists(id):
    """
    Query for a song by id and returns the playlists of song in a dictionary
    """
    song = Songs.query.get(id)

    if not song:
        return jsonify({'message': 'Song not found'}), 404
    
    playlists = PlaylistSongs.query.filter(PlaylistSongs.song_id == id).all()

    if not playlists:
        return jsonify({'message': 'Playlist not found'}), 404
    
    return [playlist.to_dict() for playlist in playlists], 200

@song_routes.route('/<int:id>/lyrics', methods=['POST'])
@login_required
def add_lyrics(id):
    """
    Creates new lyrics for song based on song id
    """
    song = Songs.query.get(id)
    if not song:
        return jsonify({'message': 'Song not found'}), 404

    if song.owner_id != current_user.id:
        return jsonify({'message': 'Forbidden'}), 403
    
    lyrics = Lyrics.query.filter(Lyrics.song_id == id).first()

    if lyrics:
        return jsonify({'message': 'Lyrics for this song already in system'}), 403
        

    form = LyricsForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        lyrics = Lyrics(
            creator_id=current_user.get_id(),
            song_id=id,
            type=form.data['type'],
            lyrics=form.data['lyrics'],
            translation=form.data['translation'],
            translation_language=form.data['translation_language']
        )
        db.session.add(lyrics)
        db.session.commit()
        return lyrics.to_dict(), 201
    return form.errors, 401 

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
        return {'message': "Successfully deleted"}
    
@song_routes.route('/<int:id>/lyrics', methods=['PUT'])
@login_required
def update_song_lyrics(id):
    """
    Update lyrics's information by song id
    """
    data = request.get_json()
    song = Songs.query.get(id)
    if not song:
        return jsonify({'message': 'Song not found'}), 404
    if song.owner_id != current_user.id:
        return jsonify({'message': 'Forbidden'}), 403
    
    lyrics = Lyrics.query.filter(Lyrics.song_id == song.id).first()
    if not lyrics:
        return jsonify({'message': 'Lyrics not found'}), 404
    if lyrics.creator_id != current_user.id:
        return jsonify({'message': 'Forbidden'}), 403
    
    lyrics.type = data.get('type', lyrics.type)
    lyrics.lyrics = data.get('lyrics', lyrics.lyrics)
    lyrics.translation = data.get('translation', lyrics.translation)
    lyrics.translation_language = data.get('translation_language', lyrics.translation_language)

    db.session.commit()
    return lyrics.to_dict()
    
@song_routes.route('/<int:id>/lyrics', methods=['DELETE'])
@login_required
def delete_lyric(id):
    """
    Deletes lyrics by song id
    """
    song = Songs.query.get(id)
    if not song:
        return jsonify({'message': 'Song not found'}), 404
    
    if song.owner_id != current_user.id:
        return jsonify({'message': 'Forbidden'}), 403

    lyrics = Lyrics.query.filter(Lyrics.song_id == song.id).first()
    if not lyrics:
        return jsonify({'message': 'Lyrics not found'}), 404
    if lyrics.creator_id != current_user.id:
        return jsonify({'message': 'Forbidden'}), 403

    if lyrics:
        db.session.delete(lyrics)
        db.session.commit()
        return jsonify({'message': "Successfully deleted"}), 204
    
@song_routes.route('/<int:id>', methods=['POST'])
@login_required
def create_like(id):
    """
    Adds like by song id
    """
    song = Songs.query.get(id)
    if not song:
        return jsonify({'message': 'Song not found'}), 404
    
    if song.owner_id != current_user.id:
        return jsonify({'message': 'Forbidden'}), 403
    
    like = Likes.query.filter(and_(Likes.owner_id == current_user.get_id(), Likes.song_id == id)).first()

    if like:
        return jsonify({'message': 'Like for song already in system'}), 403
    
    form = LikesForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_like = Likes(
            owner_id=current_user.id,
            song_id=id
        )
        db.session.add(new_like)
        db.session.commit()
        return new_like.to_dict(), 201
    return form.errors, 401