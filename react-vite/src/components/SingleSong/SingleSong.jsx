import './SingleSong.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { thunkAllSongs } from '../../redux/songs';
import { useParams } from 'react-router-dom';

export default function SingleSong() {
    const dispatch = useDispatch();
    const user = useSelector(state=>state.session.user);
    const { songId } = useParams()

    useEffect(() => {
            dispatch(thunkAllSongs());
        }, [dispatch]);

    const songs = useSelector(state=>state.songs.allSongs);
    const song = songs[songId];
    console.log(song)

    return (
    <>
    <img src={song?.album_art} />
    <h1>{song?.title}</h1>
    <p>From: <b>{song?.anime}</b></p>
    <p>Album: <b>{song?.album_name}</b></p>
    <p>Artist: <b>{song?.artist}</b></p>
    </>
    )
}