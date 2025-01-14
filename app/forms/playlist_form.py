from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Playlists

def playlist_exists(form, field):
    # Checking if playlist exists
    name = field.data
    playlist = Playlists.query.filter(Playlists.name == name).first()
    if playlist:
        raise ValidationError('Playlist with that title already in system.')
    
class PlaylistForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), playlist_exists])
    image = StringField('image', validators=[])