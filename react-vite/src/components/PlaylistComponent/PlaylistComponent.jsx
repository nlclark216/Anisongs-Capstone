import './PlaylistComponent.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { thunkAllPlaylists} from '../../redux/playlists';
import { thunkPlaylistSongs } from '../../redux/songs';
import { thunkAllPlaylistSongs } from '../../redux/listSongs';
import { useNavigate, useParams} from 'react-router-dom';
import ListSongTile from './ListSongTile';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import EditPlaylistModal from '../EditPlaylistModal';
import DeletePlaylistModal from '../DeletePlaylistModal';
import { FaPlay } from "react-icons/fa";
import { IoArrowBackOutline } from "react-icons/io5";
import { Tooltip } from 'react-tooltip';

export default function PlaylistComponent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state=>state.session.user);
    const { playlistId } = useParams();
    
    useEffect(() => {
        dispatch(thunkAllPlaylists())
        dispatch(thunkPlaylistSongs(playlistId))
        dispatch(thunkAllPlaylistSongs())
    }, [dispatch, playlistId])

    const handleClick = () => {
        return alert('Coming soon!')
    }

    const allPlaylists = useSelector(state=>state.playlists.allPlaylists);
    const targetPlaylist = allPlaylists[playlistId];
    const songs = useSelector(state=>state.songs.playlistSongs);
    const isOwner = targetPlaylist?.creator_id === user?.id;

    const listSongs = useSelector(state=>state.playlistSongs.allPlaylistSongs)

    return (
        <>
        <div className="back-button">
                <Tooltip id="tooltip" followCursor/>
                <Link
                data-tooltip-id="tooltip"
                data-tooltip-float={true}
                data-tooltip-place="bottom"
                data-tooltip-content='Playlists' 
                to='/playlists/' 
                ><IoArrowBackOutline /></Link> 
            </div>
            <div className='single-playlist'>
            
            
            <div className='img-info'>
               <img src={targetPlaylist?.image} id='playlist' />
               <div className='info' id='playlist'>
                <h1 className='title-likes'>{targetPlaylist?.name} 
                    {user && 
                    <button id='play' onClick={handleClick}>
                    <FaPlay />Play</button>}
                </h1>
                <div className='created-for'>
                    <h4 className='creator-info'>
                        Created By:
                        <div className='profile-pic-username'>
                        {user && <img src={user?.profile_pic} />} 
                        {!isOwner ? targetPlaylist?.creator : 'You'}
                        </div>    
                    </h4>
                    {isOwner && 
                    <OpenModalMenuItem
                    itemText={<button>Edit Playlist</button>}
                    modalComponent={<EditPlaylistModal id={playlistId} playlist={targetPlaylist} />} 
                    />
                   }
                    {isOwner && 
                    <OpenModalMenuItem
                    itemText={<button id='reverse'>Delete Playlist</button>}
                    modalComponent={<DeletePlaylistModal navigate={navigate} id={playlistId} />} 
                    />
                    }
                </div> 
               </div>
                
            </div>
            
            
            {songs && Object.values(songs).length > 0 &&
            <h2>Songs</h2>}
            <div className='song-tiles' id='list-songs'>
               {songs && 
                Object.values(songs).map(song=>
                <ListSongTile key={song.id} song={song} user={user} playlist={targetPlaylist} listSongs={listSongs}
                />)} 
            </div>
            
            
        </div>
        </>
        
    )
}