from app.models import Playlists, db, environment, SCHEMA
from sqlalchemy.sql import text

def seed_playlists():
    list1 = Playlists(
        creator_id=1,
        name='Nostalgia',
        image='https://i.pinimg.com/736x/98/c6/54/98c654ba9c5af3a8e4b48926c78bb111.jpg'
    )
    list2 = Playlists(
        creator_id=1,
        name='Relaxation',
        image='https://upload.wikimedia.org/wikipedia/en/3/3e/Lo-Fi_Girl.png'
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