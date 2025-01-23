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
        album_name='Fushigi Yûgi: The Mysterious Play OST',
        album_art='https://static.wikia.nocookie.net/fushigiyuugi/images/b/b1/FYOS.jpeg',
        year=1995
    )
    song6 = Songs(
        owner_id=3,
        title='Ride on Shooting Star',
        artist='The Pillows',
        song_file='song file url',
        anime='FLCL',
        album_name='FLCL Fooly Cooly OST',
        album_art='https://i.scdn.co/image/ab67616d0000b273d7549e5484adb480ad33d6fc',
        year=2001
    )
    song7 = Songs(
        owner_id=4,
        title='Ichirin no Hana',
        artist='High and Mighty Color',
        song_file='song file url',
        anime='Bleach',
        album_name='Gou On Progressive',
        album_art='https://m.media-amazon.com/images/I/41WNM5WTBFL.jpg',
        year=2006
    )
    song8 = Songs(
        owner_id=4,
        title='departure!',
        artist='Ono Masatoshi',
        song_file='song file url',
        anime='Hunter x Hunter',
        album_name='Hunter x Hunter OST',
        album_art='https://kantopia.wordpress.com/wp-content/uploads/2014/12/ost-hunter-x-hunter.jpg',
        year=2011
    )
    song9 = Songs(
        owner_id=5,
        title='Inferno',
        artist='Mrs. Green Apple',
        song_file='song file url',
        anime='Fire Force',
        album_name='Inferno - Single',
        album_art='https://static.wikia.nocookie.net/jpop/images/f/f0/Inferno.jpg',
        year=2019
    )
    song10 = Songs(
        owner_id=5,
        title='JOJO ~Sono Chi no Sadame~',
        artist='Hiroaki Tommy Tominaga',
        song_file='song file url',
        anime='JoJo’s Bizarre Adventure',
        album_name='JoJo (Sono Chi no Sadame)',
        album_art='https://s.mxmcdn.net/images-storage/albums/7/2/8/2/4/9/30942827_500_500.jpg',
        year=2012
    )
    song11 = Songs(
        owner_id=6,
        title='Kyouran Hey Kids!!',
        artist='THE ORAL CIGARETTES',
        song_file='song file url',
        anime='Noragami',
        album_name='FIXION',
        album_art='https://static.wikia.nocookie.net/jpop/images/b/b8/Fixion_cover.jpeg',
        year=2016
    )
    song12 = Songs(
        owner_id=6,
        title='Lost in Paradise',
        artist='ALI',
        song_file='song file url',
        anime='Jujutsu Kaisen',
        album_name='MUSIC WORLD',
        album_art='https://i.scdn.co/image/ab67616d0000b2735e2e3efc7de4731fb4e9db36',
        year=2023
    )
    song13 = Songs(
        owner_id=1,
        title='COLORS',
        artist='FLOW',
        song_file='song file url',
        anime='Code Geass: Lelouch of the Rebellion',
        album_name='COLORS - Single',
        album_art='https://upload.wikimedia.org/wikipedia/en/d/d5/FLOWColors.jpg',
        year=2006
    )
    song14 = Songs(
        owner_id=1,
        title='Again',
        artist='Yui',
        song_file='song file url',
        anime='Fullmetal Alchemist: Brotherhood',
        album_name='Holidays in the Sun',
        album_art='https://m.media-amazon.com/images/I/51bv7RGxjcL._SX300_SY300_QL70_FMwebp_.jpg',
        year=2010
    )
    song15 = Songs(
        owner_id=1,
        title='Tank!',
        artist='the Seatbelts',
        song_file='song file url',
        anime='Cowboy Bebop',
        album_name='Cowboy Bebop (album)',
        album_art='https://static.wikia.nocookie.net/cowboybebop/images/4/47/CD1.jpg',
        year=1998
    )
    song16 = Songs(
        owner_id=1,
        title='The Hero!! ~Ikareru Ken ni Honō o Tsukeru~',
        artist='JAM Project',
        song_file='song file url',
        anime='One Punch Man',
        album_name='One Take Man',
        album_art='https://static.wikia.nocookie.net/onepunchman/images/4/46/One_take_man.jpg',
        year=2008
    )
    song17 = Songs(
        owner_id=1,
        title='We Are!',
        artist='Hiroshi Kitadani',
        song_file='song file url',
        anime='One Piece',
        album_name='We Are! - Single',
        album_art='https://i.scdn.co/image/ab67616d0000b2730795239baa90ce9084124aa5',
        year=2000
    )
    song18 = Songs(
        owner_id=1,
        title='Rose',
        artist='Anna Tsuchiya',
        song_file='song file url',
        anime='NANA',
        album_name='Strip Me?',
        album_art='https://static.fnac-static.com/multimedia/FR/Images_Produits/FR/fnac.com/Visual_Principal_340/4/2/4/3700091011424/tsp20120923053111/Strip-me.jpg',
        year=2006
    )
    song19 = Songs(
        owner_id=1,
        title='Odd Future',
        artist='UVERworld',
        song_file='song file url',
        anime='My Hero Academia',
        album_name='ODD FUTURE - Single',
        album_art='https://static.wikia.nocookie.net/jpop/images/7/7b/SRCL-9764.jpg',
        year=2018
    )
    song20 = Songs(
        owner_id=1,
        title='Unravel',
        artist='TK from Ling tosite sigure',
        song_file='song file url',
        anime='Tokyo Ghoul',
        album_name='Fantastic Magic',
        album_art='https://static.wikia.nocookie.net/jpop/images/7/77/Fantastic_Magic_B.jpg',
        year=2014
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