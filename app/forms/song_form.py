from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError, Length, NumberRange
from app.models import Songs
from app.api.helper import ALLOWED_MUSIC_EXTENSIONS

def song_exists(form, field):
    # Checking if song exists
    title = field.data
    song = Songs.query.filter(Songs.title == title).first()
    if song:
        raise ValidationError('Song with that title already in system.')
    
class SongForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), song_exists, Length(min=1,max=50)])
    artist = StringField('artist', validators=[DataRequired(), Length(min=1,max=50)])
    song_file = FileField("song_file", validators=[FileRequired(), FileAllowed(list(ALLOWED_MUSIC_EXTENSIONS))])
    anime = StringField('artist', validators=[DataRequired(), Length(min=1,max=50)])
    album_name = StringField('artist', validators=[DataRequired(), Length(min=1,max=50)])
    album_art = StringField('artist', validators=[])
    year = IntegerField('year', validators=[DataRequired(), NumberRange(min=1900,max=2050,message='Must provide valid album year')])
    submit = SubmitField("Upload Song")