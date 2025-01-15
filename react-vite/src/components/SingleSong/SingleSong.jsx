import './SingleSong.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { thunkAllSongs } from '../../redux/songs';
import { thunkSongLyrics } from '../../redux/lyrics';
import { useParams } from 'react-router-dom';

export default function SingleSong() {
    const dispatch = useDispatch();
    const user = useSelector(state=>state.session.user);
    const { songId } = useParams()

    useEffect(() => {
            dispatch(thunkAllSongs());
            dispatch(thunkSongLyrics(songId))
        }, [dispatch]);

    const songs = useSelector(state=>state.songs.allSongs);
    const song = songs[songId];
    const lyrics = useSelector(state=>state.lyrics.songLyrics)
    console.log(lyrics)

    return (
    <>
    <img src={song?.album_art} />
    <h1>{song?.title}</h1>
    <p>From: <b>{song?.anime}</b></p>
    <p>Album: <b>{song?.album_name}</b></p>
    <p>Artist: <b>{song?.artist}</b></p>
    <div className='song-lyrics-translation'>
        <label>
            Lyrics
           <p style={{'white-space': 'pre-line'}}>{(lyrics?.lyrics)}</p> 
        </label>
        <label>
            Translation
            <p style={{'white-space': 'pre-line'}}>{lyrics?.translation}</p> 
        </label>
    </div>
    </>
    )
}