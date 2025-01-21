from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import SubmitField, IntegerField, StringField
from wtforms.validators import DataRequired, ValidationError
from app.api.helper import ALLOWED_EXTENSIONS
from app.models import Files

def file_exists(form, field):
    song = field.data
    file = Files.query.filter(Files.song_id == song).first()
    if file:
        raise ValidationError('Song already has uploaded file.')


class FileForm(FlaskForm):
    song_id = IntegerField('song_id', validators=[])
    file = FileField("Music File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    # file = StringField('file', validators=[])
    submit = SubmitField('Upload Song')