from app.models import Lyrics, db, environment, SCHEMA
from sqlalchemy.sql import text

def seed_lyrics():
    lyrics1 = Lyrics(
        creator_id=1,
        song_id=1,
        type='Romaji',
        lyrics="fukai fukai mori no oku ni ima mo kitto\nokizari ni shita kokoro kakushite'ru yo\nsagasu hodo no chikara mo naku tsukarehateta\nhitobito wa eien no yami ni kieru\nchiisai mama nara kitto ima demo mieta ka na\nboku-tachi wa ikiru hodo ni\nnakushite'ku sukoshi zutsu\nitsuwari ya uso wo matoi\ntachisukumu koe mo naku\naoi aoi sora no iro mo kidzukanai mama\nsugite yuku mainichi ga kawatte yuku\ntsukurareta wakugumi wo koe ima wo ikite\nsabitsuita kokoro mata ugokidasu yo\ntoki no rizumu wo shireba mo ichido toberu darou\nboku-tachi wa samayoi nagara\nikite yuku doko made mo\nshinjite'ru hikari motome\narukidasu kimi to ima\nboku-tachi wa ikiru hodo ni\nnakushite'ku sukoshi zutsu\nitsuwari ya uso wo matoi\ntachisukumu koe mo naku\nboku-tachi wa samayoi nagara\nikite yuku doko made mo\nfurikaeru\nmichi wo tozashi\naruite'ku eien ni",
        translation="Hiding deep, hiding deep in the forest, I know, lost among the trees\nAre the hearts that we simply left behind so many years ago\nHaving lost, having lost all our power to search, we lie completely drained\nAs our weary souls slowly fade away and darkness closes in\nOh, if we had just stayed forever young\nCould we find ourselves again, I wonder?\nEvery step we take, the more we seem to lose\nEvery waking breath, just a little more\nCaught up in the lies that hide between the lines\nNowhere left to run, nothing left to say\nNever stopping to gaze at the bluest of skies, the color starts to fade\nAnd it’s changing with every passing day, our time is moving on\nIf we live for the moment and break all the walls we put up long ago\nOh, if we come to know the flow of time\nWill we fly up once again, I wonder?\nAs we move along, we live as wanderers\nLiving day to day, everywhere we go\nSearching for the light and trying to believe\nHere we are again, walking hand in hand\nEvery step we take, the more we seem to lose\nEvery waking breath, just a little more\nCaught up in the lies that hide between the lines\nNowhere left to run, nothing left to say\nAs we move along, we live as wanderers\nLiving day to day, everywhere we go\nTurning from the past, those roads we knew before\nWalking here with you, here forevermore\nNowhere left to run, nothing left to say\nLiving day to day, here forevermore"
    )

    db.session.add(lyrics1)
    db.session.commit()

def undo_lyrics():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.lyrics RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM lyrics"))
        
    db.session.commit()