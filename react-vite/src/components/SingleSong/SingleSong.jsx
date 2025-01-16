import './SingleSong.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { thunkAllSongs } from '../../redux/songs';
import { thunkSongLyrics } from '../../redux/lyrics';
import { useParams } from 'react-router-dom';
import CheckLikes from './CheckLikesComponent';

export default function SingleSong() {
    const dispatch = useDispatch();
    const user = useSelector(state=>state.session.user);
    const { songId } = useParams()

    useEffect(() => {
            dispatch(thunkAllSongs());
            dispatch(thunkSongLyrics(songId))
        }, [dispatch, songId]);

    const songs = useSelector(state=>state.songs.allSongs);
    const song = songs[songId];
    const lyrics = useSelector(state=>state.lyrics.songLyrics);
    console.log(lyrics)

    let likes;

    if (song?.likes) likes = song?.likes;
 

    return (
    <>
    <img src={song?.album_art} />
    <h1>{song?.title} {likes && user && <CheckLikes arr={likes} user={user} />}</h1>
    <p>From: <b>{song?.anime}</b></p>
    <p>Album: <b>{song?.album_name}</b></p>
    <p>Artist: <b>{song?.artist}</b></p>
   {user && user?.id === song?.owner_id &&
   <div>
        <button>Edit Song</button>
        <button>Delete Song</button>
    </div>}
    {Object.values(lyrics).length > 0 && !lyrics.message && <div className='song-lyrics-translation'>
        <label>
            <h4>Lyrics</h4>
           <p style={{'whiteSpace': 'pre-line'}}>{(lyrics?.lyrics)}</p> 
        </label>
        <label>
            <h4>Translation</h4>
            <p style={{'whiteSpace': 'pre-line'}}>{lyrics?.translation}</p> 
        </label>
    </div>}
    {user && lyrics && lyrics?.creator_id === user?.id &&
    <div>
        <button>Edit Lyrics</button>
        <button>Delete Lyrics</button> 
    </div>
    }
    {!user && <p>Login to view lyrics submitted by Ani-Songs users!</p>}
    </>
    )
}