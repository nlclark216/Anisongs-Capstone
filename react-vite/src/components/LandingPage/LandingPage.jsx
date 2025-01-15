import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import './LandingPage.css'
import { useEffect } from 'react';
import { thunkAllSongs, thunkUserSongs } from '../../redux/songs';
import { thunkAllPlaylists, thunkUserPlaylists } from '../../redux/playlists';
import { FiChevronRight } from "react-icons/fi";
import { listTile } from '../PlaylistsComponent/PlaylistsComponent';
import { songTile } from '../SongsComponent/SongsComponent';

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
            songTile(song)
        ))}
        <h3><Link to='/playlists'>New Playlists</Link> <FiChevronRight /></h3>
        {allPlaylists && allPlaylists.map(list=>(
            listTile(list)
        ))}
       
        </>)
    
    return(
    <>
    <h1>Home</h1>
    {userPlaylists.length > 1 && <h3><Link to='/songs'>Your Songs</Link> <FiChevronRight /></h3>}
    {userSongs && userSongs.map(song=>(
            songTile(song)
        ))}
    {userPlaylists.length > 1 && <h3><Link to='/playlists'>Your Playlists</Link> <FiChevronRight /></h3>}
    {userPlaylists && userPlaylists.map(list=>(
            listTile(list)
        ))}
    
    <h3><Link to='/songs'>All Songs</Link> <FiChevronRight /></h3>
    {allSongs && allSongs.map(song=>(
            songTile(song)
        ))}
    <h3><Link to='/songs'>All Playlists</Link> <FiChevronRight /></h3>
    {allPlaylists && allPlaylists.map(list=>(
            listTile(list)
        ))}
    </>
)
}