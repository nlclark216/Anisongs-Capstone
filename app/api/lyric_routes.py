from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Lyrics, db
from app.forms import LyricsForm

lyric_routes = Blueprint('lyrics', __name__)

@lyric_routes.route('/')
@login_required
def lyrics():
    """
    Query for all lyrics and returns them in a list of lyric dictionaries
    """
    lyrics = Lyrics.query.all()
    return {'lyrics': [lyric.to_dict() for lyric in lyrics]}

@lyric_routes.route('/', methods=['POST'])
@login_required
def create_lyrics():
    """
    Creates new lyrics
    """
    form = LyricsForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        lyric = Lyrics(
            creator_id=current_user.get_id(),
            song_id=form.data['song_id'],
            type=form.data['type'],
            lyrics=form.data['lyrics'],
            translation=form.data['translation'],
            translation_language=form.data['translation_language']
        )
        db.session.add(lyric)
        db.session.commit()
        return lyric.to_dict(), 201
    return form.errors, 401

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
@login_required
def lyric(id):
    """
    Query for a lyric by id and returns that lyric in a dictionary
    """
    lyric = Lyrics.query.get(id)

    if not lyric:
        return { 'message': 'Lyrics not found'}
    
    return lyric.to_dict()