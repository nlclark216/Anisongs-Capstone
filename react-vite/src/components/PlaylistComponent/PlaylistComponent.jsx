import './PlaylistComponent.css';
import { useDispatch, useSelector } from 'react-redux';
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
                    <button>
                        <OpenModalMenuItem
                        itemText='Edit Playlist'
                        modalComponent={<EditPlaylistModal id={playlistId} playlist={targetPlaylist} />} 
                        />
                    </button>}
                    {isOwner && 
                    <button id='reverse'>
                        <OpenModalMenuItem
                        itemText='Delete Playlist'
                        modalComponent={<DeletePlaylistModal navigate={navigate} id={playlistId} />} 
                        />
                    </button>}
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
    )
}