import './SongsComponent.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { thunkAllSongs, thunkUserSongs } from '../../redux/songs';
import { thunkAllLikes } from '../../redux/likes';
import SongTile from './SongTileComponent';
import { Link } from 'react-router-dom';



export default function SongsComponent() {
    const dispatch = useDispatch();
    const user = useSelector(state=>state.session.user);

    useEffect(() => {
            dispatch(thunkAllSongs());
            dispatch(thunkUserSongs());
            dispatch(thunkAllLikes());
        }, [dispatch]);

    const allSongs = useSelector(state=>state.songs.allSongs);
    const userSongs = useSelector(state=>state.songs.userSongs);
    let otherSongs;
    if(allSongs) otherSongs = Object.values(allSongs).filter(list=>list?.owner_id !== user?.id);
    
    const handleClick = e => {
        e.preventDefault()
    }

    if(user) { return(
        <>
        <h1>Songs</h1>
        <div>
           <h2>Your Songs</h2>
            <button onClick={handleClick}><Link to='/songs/new'>upload a track</Link> </button>
        </div>
        {userSongs && Object.values(userSongs)?.map(song=><SongTile key={song.id} song={song} user={user} />)}
        <h2>User Submissions</h2>
        {otherSongs && otherSongs?.map(song=><SongTile key={song.id} song={song} user={user} />)}
        </>
        )}
    
        else return (
        <>
        <h1>Songs</h1>
        {allSongs && Object.values(allSongs)?.map(song=><SongTile key={song.id} song={song} user={user} />)}
        </>
        )
}