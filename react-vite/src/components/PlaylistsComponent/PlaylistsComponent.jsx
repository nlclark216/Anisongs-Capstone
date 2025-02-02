import { useDispatch, useSelector } from 'react-redux';
import './PlaylistsComponent.css';
import { useEffect } from 'react';
import { thunkAllPlaylists, thunkUserPlaylists } from '../../redux/playlists';
import ListTile from './ListTileComponent';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import CreatePlaylistForm from '../CreatePlaylistForm';
import { Link } from 'react-router-dom';
import { IoArrowBackOutline } from "react-icons/io5";
import { Tooltip } from 'react-tooltip';

export default function PlaylistsComponent() {
    const dispatch = useDispatch();
    const user = useSelector(state=>state.session.user);

    useEffect(() => {
        dispatch(thunkAllPlaylists());
        if(user){ dispatch(thunkUserPlaylists()); }
    }, [dispatch, user])

    const allPlaylists = useSelector(state=>state.playlists.allPlaylists);
    const userPlaylists = useSelector(state=>state.playlists.userPlaylists);
    let otherLists;
    if(allPlaylists) otherLists = Object.values(allPlaylists).filter(list=>list?.creator_id !== user?.id)

    if(user) { return(
    <div className='playlists-page'>
        <div className="back-button">
            <Tooltip id="tooltip" followCursor/>
            <Link
            data-tooltip-id="tooltip"
            data-tooltip-float={true}
            data-tooltip-place="bottom"
            data-tooltip-content='Home' 
            to='/' ><IoArrowBackOutline /></Link> 
        </div>
    <h1>Playlists</h1>
    <h2 className='your-playlists'>Your Playlists 
        <OpenModalMenuItem
        itemText={<button>Create New Playlist</button>}
        modalComponent={<CreatePlaylistForm />} 
        />
    </h2>
    <div className='list-tiles-container'>
      {userPlaylists && 
      Object.values(userPlaylists)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map(list=>
      <ListTile user={user} key={+list?.id} playlist={list} 
      />)}  
    </div>
    
    <h2>User Submissions</h2>
    <div className='list-tiles-container'>
        {otherLists && 
        otherLists?.length > 0 && 
        otherLists
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map(list=>
        <ListTile user={user} key={+list?.id} playlist={list} 
        />)}  
    </div>
    
    </div>
    )}

    else return (
    <div className='playlists-page'>
    <div className="back-button">
        <Tooltip id="tooltip" followCursor/>
        <Link    
        data-tooltip-id="tooltip"
        data-tooltip-float={true}
        data-tooltip-place="bottom"
        data-tooltip-content='Home' 
        to='/' ><IoArrowBackOutline /></Link> 
    </div>
    <h1>Playlists</h1>
    <div className='list-tiles-container'>
       {allPlaylists &&
        Object.values(allPlaylists)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map(list=>
        <ListTile user={user} key={+list?.id} playlist={list} />)} 
    </div>
    </div>
    )

    
    

}