from flask_wtf import FlaskForm
from flask_login import current_user
from wtforms import StringField, SelectField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Likes

class LikesForm(FlaskForm):
    owner_id = IntegerField('owner_id', validators=[])
    song_id = IntegerField('song_id', validators=[])