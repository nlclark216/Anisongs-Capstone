from app.models.db import db
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User
import datetime

user_routes = Blueprint('users', __name__)

@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [(user.to_dict()) for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/current')
@login_required
def current_user_info():
    """
    Query for the user currently logged in
    """
    if not current_user:
        return { 'users': 'null' }

    return current_user.to_dict()

@user_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_user(id):
    """
    Update a user's information by id
    """
    data = request.get_json()
    user = User.query.get(id)
    if not user:
        return jsonify({'message': 'User not found'}), 404
    if user.id != current_user.id:
        return jsonify({'message': 'Forbidden'}), 403

    user.first_name = data.get('first_name', user.first_name)
    user.last_name = data.get('last_name', user.last_name)
    user.email = data.get('email', user.email)
    user.city = data.get('city', user.city)
    user.state = data.get('state', user.state)
    user.address = data.get('address', user.address)
    user.country = data.get('country', user.country)
    user.profile_pic = data.get('profile_pic', user.profile_pic)
    user.username = data.get('username', user.username)
    user.updated_at = datetime.datetime.now()

    db.session.commit()
    return user.to_dict()

@user_routes.route('/current', methods=['PUT'])
@login_required
def update_current():
    """
    Update a user's information by id
    """
    data = request.get_json()
    user = User.query.get(current_user.get_id())

    if not user:
        return jsonify({'message': 'Forbidden'}), 403

    user.first_name = data.get('first_name', user.first_name)
    user.last_name = data.get('last_name', user.last_name)
    user.email = data.get('email', user.email)
    user.city = data.get('city', user.city)
    user.state = data.get('state', user.state)
    user.address = data.get('address', user.address)
    user.country = data.get('country', user.country)
    user.profile_pic = data.get('profile_pic', user.profile_pic)
    user.username = data.get('username', user.username)
    user.updated_at = datetime.datetime.now()

    db.session.commit()
    return user.to_dict()

@user_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_user(id):
    """
    Deletes user by id
    """
    user = User.query.get(id)
    if not user:
        return jsonify({'message': 'User not found'}), 404
    if user.id != current_user.id:
        return jsonify({'message': 'Forbidden'}), 403

    if user:
        db.session.delete(user)
        db.session.commit()
        return { 'message': "Successfully deleted" }


@user_routes.route('/current', methods=['DELETE'])
@login_required
def delete_current_user():
    """
    Deletes current user
    """
    user = User.query.get(current_user.get_id())
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': "Successfully deleted"}), 204

    return {'errors': {'message': "User could not be found"}}, 404
