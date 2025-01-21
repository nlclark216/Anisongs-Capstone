from app.models import Files, db, environment, SCHEMA
from sqlalchemy.sql import text

def seed_files():
    file1 = Files(
        owner_id=1,
        song_id=1,
        file='file url'
    )

    db.session.add(file1)

    db.session.commit()

def undo_files():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.files RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM files"))
        
    db.session.commit()