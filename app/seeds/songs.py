from app.models import Songs, db, environment, SCHEMA
from sqlalchemy.sql import text

def seed_songs():
    song1 = Songs(
        owner_id=1,
        title='Fukai Mori',
        artist='Do As Infinity',
        song_file='song file url',
        anime='InuYasha',
        album_name='Deep Forest',
        album_art='https://i.scdn.co/image/ab67616d00001e023957a30e8f71d5adf8889a9b',
        year=2001
    )
    song2 = Songs(
        owner_id=1,
        title="The Cruel Angel's Thesis",
        artist='Yoko Takahashi',
        song_file='song file url',
        anime='Neon Genesis Evangelion',
        album_name="「Cruel Angel's Thesis」",
        album_art='https://ia601501.us.archive.org/2/items/evangelion-angel-thesis/cover.jpg',
        year=1995
    )
    song3 = Songs(
        owner_id=2,
        title='ALIVE',
        artist='ClariS',
        song_file='song file url',
        anime='Lycoris Recoil',
        album_name='Iris',
        album_art='https://i.scdn.co/image/ab67616d00001e025f99233c71c5c2decd1ff77f',
        year=2024
    )
    song4 = Songs(
        owner_id=2,
        title='From the Edge',
        artist='LiSA',
        song_file='song file url',
        anime='Demon Slayer',
        album_name='Parade',
        album_art='https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/27/31/e2/2731e2f7-ff58-7f09-4dca-6ef2c72457a6/4547366618228.jpg/632x632bb.webp',
        year=2019
    )
    song5 = Songs(
        owner_id=3,
        title='Itooshii Hito no Tame Ni',
        artist='Satou Akemi',
        song_file='song file url',
        anime='Fushigi Yuugi',
        album_name='Fushigi Yûgi: The Mysterious Play Original Soundtrack',
        album_art='https://static.wikia.nocookie.net/fushigiyuugi/images/b/b1/FYOS.jpeg',
        year=1995
    )
    song6 = Songs(
        owner_id=3,
        title='Ride on Shooting Star',
        artist='The Pillows',
        song_file='song file url',
        anime='FLCL',
        album_name='FLCL Fooly Cooly Original Sound Track',
        album_art='https://i.scdn.co/image/ab67616d0000b273d7549e5484adb480ad33d6fc',
        year=2001
    )

    db.session.add(song1)
    db.session.add(song2)
    db.session.add(song3)
    db.session.add(song4)
    db.session.add(song5)
    db.session.add(song6)
    db.session.commit()

def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs"))
        
    db.session.commit()