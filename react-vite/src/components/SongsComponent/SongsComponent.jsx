import './SongsComponent.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { thunkAllSongs, thunkUserSongs } from '../../redux/songs';
import { Link } from 'react-router-dom';


export const songTile = song => {
    return (
        <Link 
        key={song?.id} 
        className='song-tile'
        to={`/songs/${song?.id}`}
        >
            <h5>{song?.title}</h5>
            <img src={song?.song_img} />
        </Link>
    )
}

export default function SongsComponent() {
    const dispatch = useDispatch();
    const user = useSelector(state=>state.session.user);

    useEffect(() => {
            dispatch(thunkAllSongs());
            dispatch(thunkUserSongs());
        }, [dispatch]);

    const allSongs = Object.values(useSelector(state=>state.songs.allSongs));
    const userSongs = Object.values(useSelector(state=>state.songs.userSongs));
    const otherSongs = allSongs.filter(list=>list?.owner_id !== user?.id);
    
    const handleClick = e => {
        e.preventDefault()
    }

    if(user) { return(
        <>
        <h1>Songs</h1>
        <div>
           <h3>Your Songs</h3>
            <button onClick={handleClick}>upload a track</button> 
        </div>
        {userSongs?.map(song=>songTile(song))}
        <h3>User Submissions</h3>
        {otherSongs?.map(song=>songTile(song))}
        </>
        )}
    
        else return (
        <>
        <h1>Songs</h1>
        {allSongs?.map(song=>songTile(song))}
        </>
        )
}