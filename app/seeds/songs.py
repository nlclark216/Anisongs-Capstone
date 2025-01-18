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
        album_art='https://upload.wikimedia.org/wikipedia/en/c/cb/Deep_Forest_%28Do_As_Infinity_album%29.jpg',
        year=2001,
        language='Japanese'
    )
    song2 = Songs(
        owner_id=1,
        title="The Cruel Angel's Thesis",
        artist='Yoko Takahashi',
        song_file='song file url',
        anime='Neon Genesis Evangelion',
        album_name="「Cruel Angel's Thesis」",
        album_art='https://ia601501.us.archive.org/2/items/evangelion-angel-thesis/cover.jpg',
        year=1995,
        language='Japanese'
    )
    song3 = Songs(
        owner_id=2,
        title='ALIVE',
        artist='ClariS',
        song_file='song file url',
        anime='Lycoris Recoil',
        album_name='Iris',
        album_art='https://i.scdn.co/image/ab67616d00001e025f99233c71c5c2decd1ff77f',
        year=2024,
        language='Japanese'
    )
    song4 = Songs(
        owner_id=2,
        title='From the Edge',
        artist='LiSA',
        song_file='song file url',
        anime='Demon Slayer',
        album_name='Parade',
        album_art='https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/27/31/e2/2731e2f7-ff58-7f09-4dca-6ef2c72457a6/4547366618228.jpg/632x632bb.webp',
        year=2019,
        language='Japanese'
    )
    song5 = Songs(
        owner_id=3,
        title='Itooshii Hito no Tame Ni',
        artist='Satou Akemi',
        song_file='song file url',
        anime='Fushigi Yuugi',
        album_name='Fushigi Yûgi: The Mysterious Play Original Soundtrack',
        album_art='https://static.wikia.nocookie.net/fushigiyuugi/images/b/b1/FYOS.jpeg',
        year=1995,
        language='Japanese'
    )
    song6 = Songs(
        owner_id=3,
        title='Ride on Shooting Star',
        artist='The Pillows',
        song_file='song file url',
        anime='FLCL',
        album_name='FLCL Fooly Cooly Original Sound Track',
        album_art='https://i.scdn.co/image/ab67616d0000b273d7549e5484adb480ad33d6fc',
        year=2001,
        language='Japanese'
    )
    song7 = Songs(
        owner_id=4,
        title='song title',
        artist='artist',
        song_file='song file url',
        anime='anime name',
        album_name='album name',
        year=2005
    )
    song8 = Songs(
        owner_id=4,
        title='song title',
        artist='artist',
        song_file='song file url',
        anime='anime name',
        album_name='album name',
        year=2005
    )
    song9 = Songs(
        owner_id=5,
        title='song title',
        artist='artist',
        song_file='song file url',
        anime='anime name',
        album_name='album name',
        year=2015
    )
    song10 = Songs(
        owner_id=5,
        title='song title',
        artist='artist',
        song_file='song file url',
        anime='anime name',
        album_name='album name',
        year=2025
    )
    song11 = Songs(
        owner_id=6,
        title='song title',
        artist='artist',
        song_file='song file url',
        anime='anime name',
        album_name='album name',
        year=2012
    )
    song12 = Songs(
        owner_id=6,
        title='song title',
        artist='artist',
        song_file='song file url',
        anime='anime name',
        album_name='album name',
        year=2000
    )
    song13 = Songs(
        owner_id=1,
        title='song title',
        artist='artist',
        song_file='song file url',
        anime='anime name',
        album_name='album name',
        year=2019
    )
    song14 = Songs(
        owner_id=1,title='song title',
        artist='artist',
        song_file='song file url',
        anime='anime name',
        album_name='album name',
        year=2016
    )
    song15 = Songs(
        owner_id=1,
        title='song title',
        artist='artist',
        song_file='song file url',
        anime='anime name',
        album_name='album name',
        year=2009
    )
    song16 = Songs(
        owner_id=1,
        title='song title',
        artist='artist',
        song_file='song file url',
        anime='anime name',
        album_name='album name',
        year=2013
    )
    song17 = Songs(
        owner_id=1,
        title='song title',
        artist='artist',
        song_file='song file url',
        anime='anime name',
        album_name='album name',
        year=2005
    )
    song18 = Songs(
        owner_id=1,
        title='song title',
        artist='artist',
        song_file='song file url',
        anime='anime name',
        album_name='album name',
        year=1997
    )
    song19 = Songs(
        owner_id=1,
        title='song title',
        artist='artist',
        song_file='song file url',
        anime='anime name',
        album_name='album name',
        year=1998
    )
    song20 = Songs(
        owner_id=1,
        title='song title',
        artist='artist',
        song_file='song file url',
        anime='anime name',
        album_name='album name',
        year=2003
    )

    db.session.add(song1)
    db.session.add(song2)
    db.session.add(song3)
    db.session.add(song4)
    db.session.add(song5)
    db.session.add(song6)
    db.session.add(song7)
    db.session.add(song8)
    db.session.add(song9)
    db.session.add(song10)
    db.session.add(song11)
    db.session.add(song12)
    db.session.add(song13)
    db.session.add(song14)
    db.session.add(song15)
    db.session.add(song16)
    db.session.add(song17)
    db.session.add(song18)
    db.session.add(song19)
    db.session.add(song20)

    db.session.commit()

def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs"))
        
    db.session.commit()