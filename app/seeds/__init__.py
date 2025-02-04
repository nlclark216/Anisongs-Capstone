from flask.cli import AppGroup
from .users import seed_users, undo_users
from .playlists import seed_playlists, undo_playlists
from .songs import seed_songs, undo_songs
from .likes import seed_likes, undo_likes
from .lyrics import seed_lyrics, undo_lyrics
from .playlist_songs import seed_playlist_songs, undo_playlist_songs

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_playlist_songs()
        undo_lyrics()
        undo_likes()
        undo_songs()
        undo_playlists()
        undo_users()
    seed_users()
    seed_playlists()
    seed_songs()
    seed_likes()
    seed_lyrics()
    seed_playlist_songs()

    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_playlist_songs()
    undo_lyrics()
    undo_likes()
    undo_songs()
    undo_playlists()
    undo_users()
    # Add other undo functions here
