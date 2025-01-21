from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Files
from app.forms import FileForm
import boto3
import botocore
import os
import uuid

ALLOWED_EXTENSIONS = {"mp3", "mp4", "wav", "aiff", "m4a", "flac", "wma", "alac", "flac", "aac"}
BUCKET_NAME = os.environ.get("S3_BUCKET")
S3_LOCATION = f"http://{BUCKET_NAME}.s3.amazonaws.com/"

s3 = boto3.client(
   "s3",
   aws_access_key_id=os.environ.get("S3_KEY"),
   aws_secret_access_key=os.environ.get("S3_SECRET")
)

def get_unique_filename(filename):
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"

def upload_file_to_s3(file, acl="public-read"):
    try:
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        # in case the your s3 upload fails
        return {"errors": str(e)}

    return {"url": f"{S3_LOCATION}{file.filename}"}

def remove_file_from_s3(file_url):
    # AWS needs the file name, not the URL, 
    # so you split that out of the URL
    key = file_url.rsplit("/", 1)[1]
    try:
        s3.delete_object(
        Bucket=BUCKET_NAME,
        Key=key
        )
    except Exception as e:
        return { "errors": str(e) }
    return True

file_routes = Blueprint('files', __name__)

@file_routes.route('/')
def files():
    """
    Query for all files and returns them in a list of file dictionaries
    """

    files = Files.query.all()

    return { 'files': [file.to_dict() for file in files] }, 200

@file_routes.route('/', methods=['POST'])
@login_required
def create_file():
    """
    Uploads a new song file
    """
    form = FileForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        file = Files(
           owner_id=current_user.get_id(),
           song_id=form.data['song_id'],
           file=form.data['file']
        )
        db.session.add(file)
        db.session.commit()
        return file.to_dict(), 201
    return form.errors, 401
