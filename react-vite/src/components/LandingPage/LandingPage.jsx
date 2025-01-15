import { useDispatch, useSelector } from 'react-redux'
import './LandingPage.css'
import { useEffect } from 'react';
import { thunkAllSongs, thunkUserSongs } from '../../redux/songs';
import { thunkAllPlaylists, thunkUserPlaylists } from '../../redux/playlists';

export default function LandingPage(){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkAllSongs());
        dispatch(thunkAllPlaylists());
        dispatch(thunkUserPlaylists());
        dispatch(thunkUserSongs());
    }, [dispatch]);

    const allSongs = useSelector(state=>state.songs.allSongs);
    const userSongs = useSelector(state=>state.songs.userSongs);
    const allPlaylists = useSelector(state=>state.playlists.allPlaylists);
    const userPlaylists = useSelector(state=>state.playlists.userPlaylists);
    const currentUser = useSelector(state=>state.session.user);
    
    if(!currentUser) return (<>
        <h1>Welcome to Ani-Songs!</h1>
        <h3>New Playlists</h3>
        {allPlaylists && Object.values(allPlaylists).map(list=>(
            <div key={list?.id}>{list?.name}</div>
        ))}
        <h3>New Uploads</h3>
        {allSongs && Object.values(allSongs).map(song=>(
            <div key={song?.id}>{song?.title}</div>
        ))}
        </>)
    
    return(
    <>
    <h1>Home</h1>
    <h3>Your Playlists</h3>
    {userPlaylists && Object.values(userPlaylists).map(list=>(
            <div key={list?.id}>{list?.name}</div>
        ))}
    <h3>Your Uploads</h3>
    {userSongs && Object.values(userSongs).map(song=>(
            <div key={song?.id}>{song?.title}</div>
        ))}
    </>
)
}