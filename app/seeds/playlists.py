from app.models import Playlists, db, environment, SCHEMA
from sqlalchemy.sql import text

def seed_playlists():
    list1 = Playlists(
        creator_id=1,
        name='Nostalgia'
    )
    list2 = Playlists(
        creator_id=1,
        name='Relaxation'
    )
    list3 = Playlists(
        creator_id=2,
        name='New Hits'
    )
    list4 = Playlists(
        creator_id=2,
        name='Karaoke'
    )
    list5 = Playlists(
        creator_id=3,
        name='Favorites'
    )
    list6 = Playlists(
        creator_id=3,
        name='Suggestions'
    )

    db.session.add(list1)
    db.session.add(list2)
    db.session.add(list3)
    db.session.add(list4)
    db.session.add(list5)
    db.session.add(list6)
    db.session.commit()

def undo_playlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM playlists"))
        
    db.session.commit()