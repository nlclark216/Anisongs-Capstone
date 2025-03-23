from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, PasswordField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    first_name = StringField('first_name', validators=[DataRequired(), Length(min=1,max=50,message='Please provide the first 50 characters of your first name')])
    username = StringField('username', validators=[DataRequired(), username_exists, Length(min=1,max=50,message='Username must be between 1 and 50 characters long')])
    email = StringField('email', validators=[DataRequired(), user_exists, Email()])
    password = PasswordField('password', validators=[DataRequired(), Length(min=6,max=50,message='Password must be between 6 and 50 characters long')])
    last_name = StringField('last_name', validators=[DataRequired(), Length(min=1,max=50,message='Please provide the first 50 characters of your last name')])
    city = StringField('city', validators=[DataRequired(), Length(min=1, max=50, message='Please provide your city name')])
    state = StringField('state', validators=[DataRequired(), Length(min=2, max=50, message='Please provide your state')])
    country = StringField('country', validators=[Length(min=2,max=50)], default='')
    address = StringField('address', validators=[])
    profile_pic = StringField('profile_pic', validators=[])
