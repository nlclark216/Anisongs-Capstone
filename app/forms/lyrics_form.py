from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Lyrics

def lyrics_exist(form, field):
    # Checking if lyrics exists
    song_id = field.data
    lyrics = Lyrics.query.filter(Lyrics.song_id == song_id).first()
    if lyrics:
        raise ValidationError('Playlist with that name already in system.')
    
class LyricsForm(FlaskForm):
    song_id = IntegerField('song_id', validators=[DataRequired(), lyrics_exist])
    type = StringField('type', validators=[], default='Romaji')
    lyrics = StringField('lyrics', validators=[DataRequired()])
    translation = StringField('translation', validators=[])
    translation_language = StringField('translation_language', validators=[])