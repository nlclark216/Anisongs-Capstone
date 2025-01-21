from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, SelectField, IntegerField, SubmitField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Songs
from app.api.helper import ALLOWED_EXTENSIONS

def song_exists(form, field):
    # Checking if song exists
    title = field.data
    song = Songs.query.filter(Songs.title == title).first()
    if song:
        raise ValidationError('Song with that title already in system.')
    
class SongForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), song_exists])
    artist = StringField('artist', validators=[DataRequired()])
    song_file = FileField("song_file", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    song_img = StringField('song_img', validators=[])
    anime = StringField('artist', validators=[DataRequired()])
    album_name = StringField('artist', validators=[DataRequired()])
    album_art = StringField('artist', validators=[])
    year = IntegerField('year', validators=[DataRequired()])
    submit = SubmitField("Upload Song")