import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import './LandingPage.css'
import { useEffect } from 'react';
import { thunkAllSongs, thunkUserSongs } from '../../redux/songs';
import { thunkAllPlaylists, thunkUserPlaylists } from '../../redux/playlists';
import { FiChevronRight } from "react-icons/fi";
import SongTile from '../SongsComponent/SongTileComponent';
import ListTile from '../PlaylistsComponent/ListTileComponent';

export default function LandingPage(){
    const dispatch = useDispatch();
    const currentUser = useSelector(state=>state.session.user);

    useEffect(() => {
        dispatch(thunkAllSongs());
        dispatch(thunkAllPlaylists());
        if(currentUser){
            dispatch(thunkUserPlaylists());
            dispatch(thunkUserSongs()); 
        } 
    }, [dispatch, currentUser]);

    const allSongs = Object.values(useSelector(state=>state.songs.allSongs));
    const userSongs = Object.values(useSelector(state=>state.songs.userSongs));
    const allPlaylists = Object.values(useSelector(state=>state.playlists.allPlaylists));
    const userPlaylists = Object.values(useSelector(state=>state.playlists.userPlaylists));
    
    
    if(!currentUser) return (
    <div className='landing'>
        <h1>Welcome to Ani-Songs!</h1>
        <h3 id='landing'><Link to='/songs'>Newest Uploads</Link> <FiChevronRight /></h3>
        <div className='all-songs' id='before-login'>
        {allSongs && allSongs.map(song=>(
            <SongTile key={song.id} song={song} user={currentUser} />
        ))}
        </div> 
        <h3 id='landing'><Link to='/playlists'>Top Playlists</Link> <FiChevronRight /></h3>
        <div className='all-playlists'>
           {allPlaylists && 
           allPlaylists
           .map(list=><ListTile key={list?.id} playlist={list} />)} 
        </div>
        
       
    </div>)
    
    return(
    <div className='landing'>
    <h1>Home</h1>
    {userPlaylists.length > 1 && 
    <h3 id='landing'>
        <Link to='/songs'>
        Your Songs
        </Link> 
        <FiChevronRight />
    </h3>}
    <div className='user-songs' id='landing'>
    {userSongs && userSongs.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).map(song=>(
        <SongTile key={song.id} song={song} user={currentUser} id='landing-song-tile'  />
    ))}
    </div>
    {userPlaylists.length > 1 && <h3 id='landing'><Link to='/playlists/'>Your Playlists</Link> <FiChevronRight /></h3>}
    <div className='user-playlists' id='landing'>
        {userPlaylists && userPlaylists.map(list=><ListTile key={list?.id} playlist={list} />)}  
    </div>
    <h3 id='landing'><Link to='/songs'>All Songs</Link> <FiChevronRight /></h3>
    <div className='all-songs' id='landing'>
    
    {allSongs && allSongs.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).map(song=>(
        <SongTile key={song.id} song={song} user={currentUser} id='landing-song-tile' />
    ))}
    </div>
    <h3 id='landing'><Link to='/songs'>All Playlists</Link> <FiChevronRight /></h3>
    <div className='all-playlists'>
        {allPlaylists && allPlaylists.map(list=><ListTile key={list?.id} playlist={list} />)}
    </div>
    
    </div> 
    
)
}