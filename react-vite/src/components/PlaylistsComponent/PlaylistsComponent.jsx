import { useDispatch, useSelector } from 'react-redux';
import './PlaylistsComponent.css';
import { useEffect } from 'react';
import { thunkAllPlaylists, thunkUserPlaylists } from '../../redux/playlists';
import ListTile from './ListTileComponent';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import CreatePlaylistForm from '../CreatePlaylistForm';

export default function PlaylistsComponent() {
    const dispatch = useDispatch();
    const user = useSelector(state=>state.session.user);

    useEffect(() => {
        dispatch(thunkAllPlaylists())
        dispatch(thunkUserPlaylists());
    }, [dispatch])

    const allPlaylists = Object.values(useSelector(state=>state.playlists.allPlaylists));
    const userPlaylists = Object.values(useSelector(state=>state.playlists.userPlaylists));
    const otherLists = allPlaylists.filter(list=>list?.creator_id !== user?.id)

    if(user) { return(
    <>
    <h1>Playlists</h1>
    <h3>Your Playlists 
        <button>
            <OpenModalMenuItem
            itemText='Create New Playlist'
            modalComponent={<CreatePlaylistForm />} 
            />
            </button></h3>
    {userPlaylists?.map(list=><ListTile key={list?.id} playlist={list} />)}
    <h3>User Submissions</h3>
    {otherLists.length > 0 && otherLists?.map(list=><ListTile key={list?.id} playlist={list} />)}
    </>
    )}

    else return (
    <>
    <h1>Playlists</h1>
    {allPlaylists && allPlaylists?.map(list=><ListTile key={list?.id} playlist={list} />)}
    </>
    )

    
    

}