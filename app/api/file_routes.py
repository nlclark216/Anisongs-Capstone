from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Files

file_routes = Blueprint('files', __name__)

@file_routes.route('/')
def files():
    """
    Query for all files and returns them in a list of file dictionaries
    """

    files = Files.query.all()

    return { 'files': [file.to_dict() for file in files] }, 200