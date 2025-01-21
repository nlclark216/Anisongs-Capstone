import './SongsComponent.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { thunkAllSongs, thunkUserSongs } from '../../redux/songs';
import { thunkAllLikes } from '../../redux/likes';
import SongTile from './SongTileComponent';
import { useNavigate } from 'react-router-dom';



export default function SongsComponent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state=>state.session.user);

    useEffect(() => {
            dispatch(thunkAllSongs());
            if(user) {
                dispatch(thunkUserSongs());
                dispatch(thunkAllLikes());  
            }
        }, [dispatch, user]);

    const allSongs = useSelector(state=>state.songs.allSongs);
    const userSongs = useSelector(state=>state.songs.userSongs);
    let otherSongs;
    if(allSongs) otherSongs = Object.values(allSongs).filter(list=>list?.owner_id !== user?.id);
    
    const handleClick = e => {
        e.preventDefault();
        navigate('/songs/new')
    }

    if(user) { return(
        <div className='songs-page'>
        <h1>Songs</h1>
           <div className='title-button' id='songs-page'>
            <h2>Your Songs</h2>
                <button onClick={handleClick}>upload a track</button>
            </div>
            <div className='songs-container' id='your-songs'>
               {userSongs && 
               Object.values(userSongs).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(song=>
               <SongTile key={song.id} song={song} user={user} 
               />)} 
            </div>
            
            <h2>User Submissions</h2>
            <div className='songs-container' id='user-songs'>
            {otherSongs && 
            otherSongs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(song=>
            <SongTile key={song.id} song={song} user={user} 
            />
            )
            } 
            </div>
        </div>
        )}
    
        else return (
        <div className='songs-page'>
        <h1>Songs</h1>
        <div className='songs-container'>
          {allSongs && 
          Object.values(allSongs).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(song=>
          <SongTile key={song.id} song={song} user={user} 
          />)}  
        </div>
        </div>
        )
}