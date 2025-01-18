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

    useEffect(() => {
        dispatch(thunkAllSongs());
        dispatch(thunkAllPlaylists());
        dispatch(thunkUserPlaylists());
        dispatch(thunkUserSongs());
    }, [dispatch]);

    const allSongs = Object.values(useSelector(state=>state.songs.allSongs));
    const userSongs = Object.values(useSelector(state=>state.songs.userSongs));
    const allPlaylists = Object.values(useSelector(state=>state.playlists.allPlaylists));
    const userPlaylists = Object.values(useSelector(state=>state.playlists.userPlaylists));
    const currentUser = useSelector(state=>state.session.user);
    
    if(!currentUser) return (<>
        <h1>Welcome to Ani-Songs!</h1> 
        <h3><Link to='/songs'>Newest Uploads</Link> <FiChevronRight /></h3>
        {allSongs && allSongs.map(song=>(
            <SongTile key={song.id} song={song} user={currentUser} />
        ))}
        <h3><Link to='/playlists'>New Playlists</Link> <FiChevronRight /></h3>
        {allPlaylists && allPlaylists.map(list=><ListTile key={list?.id} playlist={list} />)}
       
        </>)
    
    return(
    <div className='landing'>
    <h1>Home</h1>
    {userPlaylists.length > 1 && <h3 id='landing'><Link to='/songs'>Your Songs</Link> <FiChevronRight /></h3>}
    <div className='user-songs' id='landing'>
    {userSongs && userSongs.map(song=>(
        <SongTile key={song.id} song={song} user={currentUser}  />
    ))}
    </div>
    {userPlaylists.length > 1 && <h3 id='landing'><Link to='/playlists'>Your Playlists</Link> <FiChevronRight /></h3>}
    <div className='user-playlists' id='landing'>
        {userPlaylists && userPlaylists.map(list=><ListTile key={list?.id} playlist={list} />)}  
    </div>
    <h3 id='landing'><Link to='/songs'>All Songs</Link> <FiChevronRight /></h3>
    <div className='all-songs' id='landing'>
    
    {allSongs && allSongs.map(song=>(
        <SongTile key={song.id} song={song} user={currentUser}  />
    ))}
    </div>
    <h3 id='landing'><Link to='/songs'>All Playlists</Link> <FiChevronRight /></h3>
    <div className='all-playlists'>
        {allPlaylists && allPlaylists.map(list=><ListTile key={list?.id} playlist={list} />)}
    </div>
    
    </div> 
    
)
}