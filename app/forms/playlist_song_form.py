from flask_wtf import FlaskForm
from flask_login import current_user
from wtforms import StringField, SelectField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import PlaylistSongs, Songs

def song_in_list(form, field):
    song_id = field.data
    playlist_song = PlaylistSongs.query.filter(PlaylistSongs.song_id == song_id).first()
    if playlist_song:
        raise ValidationError('Song already in playlist.')
    
def song_exists(form, field):
    song_id = field.data
    song = Songs.query.get(song_id)
    if not song:
        raise ValidationError('Song not found')
    
class PlaylistSongsForm(FlaskForm):
    added_by = IntegerField('added_by', validators=[])
    song_id = IntegerField('song_id', validators=[DataRequired(), song_in_list, song_exists])