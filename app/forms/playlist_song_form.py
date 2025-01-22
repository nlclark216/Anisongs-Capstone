from flask_wtf import FlaskForm
from flask_login import current_user
from sqlalchemy import and_
from wtforms import StringField, SelectField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import PlaylistSongs, Songs, Playlists

def song_exists(form, field):
    song_id = field.data
    song = Songs.query.get(song_id)
    if not song:
        raise ValidationError('Song not found')
    
class PlaylistSongsForm(FlaskForm):
    added_by = IntegerField('added_by', validators=[])
    song_id = IntegerField('song_id', validators=[DataRequired(), song_exists])