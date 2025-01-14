from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
    
class LyricsForm(FlaskForm):
    type = StringField('type', validators=[], default='Romaji')
    lyrics = StringField('lyrics', validators=[DataRequired()])
    translation = StringField('translation', validators=[])
    translation_language = StringField('translation_language', validators=[])