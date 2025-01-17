from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Lyrics, db
from app.forms import LyricsForm

lyric_routes = Blueprint('lyrics', __name__)

@lyric_routes.route('/')
def lyrics():
    """
    Query for all lyrics and returns them in a list of lyric dictionaries
    """
    lyrics = Lyrics.query.all()
    return {'lyrics': [{
        'id': lyric.id,
        'creator_id': lyric.creator_id,
        'song_id': lyric.song_id,
        'type': lyric.type,
        'lyrics': lyric.lyrics,
        'translation': lyric.translation,
        'translation_language': lyric.translation_language
        } for lyric in lyrics]}


@lyric_routes.route('/current')
@login_required
def created_lyrics():
    """
    Query for all lyrics user created and returns them in a list of lyric dictionaries
    """
    lyrics = Lyrics.query.filter(Lyrics.creator_id == current_user.get_id())

    if not lyrics:
        return { 'message': 'No lyrics found' }
    
    return {'lyrics': [lyric.to_dict() for lyric in lyrics]}


@lyric_routes.route('/<int:id>')
def lyric(id):
    """
    Query for a lyric by id and returns that lyric in a dictionary
    """
    lyric = Lyrics.query.get(id)

    if not lyric:
        return { 'message': 'Lyrics not found'}
    
    return lyric.to_dict()

@lyric_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_lyrics(id):
    """
    Update lyrics's information by id
    """
    data = request.get_json()
    lyrics = Lyrics.query.get(id)
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
    

@lyric_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_lyric(id):
    """
    Deletes lyrics by id
    """
    lyrics = Lyrics.query.get(id)
    if not lyrics:
        return jsonify({'message': 'Lyrics not found'}), 404
    if lyrics.creator_id != current_user.id:
        return jsonify({'message': 'Forbidden'}), 403

    if lyrics:
        db.session.delete(lyrics)
        db.session.commit()
        return {'message': "Successfully deleted"}