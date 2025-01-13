from app.models import PlaylistSongs, db, environment, SCHEMA
from sqlalchemy.sql import text

def seed_playlist_songs():
    song1 = PlaylistSongs(
        playlist_id=1,
        song_id=1
    )
    song2 = PlaylistSongs(
        playlist_id=1,
        song_id=2
    )
    song3 = PlaylistSongs(
        playlist_id=3,
        song_id=3
    )
    song4 = PlaylistSongs(
        playlist_id=3,
        song_id=4
    )
    song5 = PlaylistSongs(
        playlist_id=5,
        song_id=5
    )
    song6 = PlaylistSongs(
        playlist_id=5,
        song_id=6
    )

    db.session.add(song1)
    db.session.add(song2)
    db.session.add(song3)
    db.session.add(song4)
    db.session.add(song5)
    db.session.add(song6)
    db.session.commit()

def undo_playlist_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlist_songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM playlist_songs"))
        
    db.session.commit()