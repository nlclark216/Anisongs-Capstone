import { useDispatch, useSelector } from 'react-redux';
import './PlaylistsComponent.css';
import { useEffect } from 'react';
import { thunkAllPlaylists, thunkUserPlaylists } from '../../redux/playlists';
import { Link } from 'react-router-dom';

export const listTile = (playlist) => {
    return (
    <Link
    to={`/playlists/${playlist?.id}`} 
    key={playlist?.id} 
    className='list-tile'>
    <h5>{playlist?.name}</h5>
    <img height='300px' src={playlist?.image} />
    </Link>
    )
}

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
    <h3>Your Playlists</h3>
    {userPlaylists?.map(list=>listTile(list))}
    <h3>User Submissions</h3>
    {otherLists?.map(list=>listTile(list))}
    </>
    )}

    else return (
    <>
    <h1>Playlists</h1>
    {allPlaylists?.map(list=>listTile(list))}
    </>
    )

    
    

}