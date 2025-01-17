import './SinglePlaylist.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { thunkAllPlaylists } from '../../redux/playlists';
import { thunkPlaylistSongs } from '../../redux/songs';
import { FaPlay } from "react-icons/fa";
import { TbMusicPlus } from "react-icons/tb";
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import AddSongModal from '../AddSongModal/AddSongModal';
import DeletePlaylistModal from '../DeletePlaylistModal';
import EditPlaylistModal from '../EditPlaylistModal';
import ListSongTile from './ListSongTileComponent';


export default function SinglePlaylist() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state=>state.session.user);
    const { playlistId } = useParams();

    useEffect(() => {
        dispatch(thunkAllPlaylists());
        dispatch(thunkPlaylistSongs(playlistId))
    }, [dispatch, playlistId]);

    const playlists = useSelector(state=>state.playlists.allPlaylists);
    const playlist = playlists[playlistId]
    const listSongs = Object.values(useSelector(state=>state.songs.playlistSongs));

    if(!playlist) navigate('/playlists/')

    return (
    <>
    <img src={playlist?.image} />
    <div>
       <h1>{playlist?.name}</h1>
       {/* {user && user?.id === playlist?.creator_id && <button>
        <OpenModalMenuItem
        itemText='Edit Playlist'
        modalComponent={
        <EditPlaylistModal 
        navigate={navigate} 
        playlist={playlist}
        id={playlistId} 
        />} 
        /></button> } */}
    </div>
    
    <p>Created By: {playlist?.creator}</p>
    {user && <div>
        <button onClick={()=>alert('Coming soon...')}><FaPlay />Play</button>
        {/* {user?.id === playlist?.creator_id && <button>
        <OpenModalMenuItem
        itemText={<><TbMusicPlus /> Add Song</>}
        modalComponent={<AddSongModal />} 
        /></button>} */}
        {/* {user?.id === playlist?.creator_id && <button><OpenModalMenuItem
        itemText='Delete Playlist'
        modalComponent={<DeletePlaylistModal id={playlistId} navigate={navigate} />} 
        /></button>} */}
    </div>}
    {listSongs?.length === 0 ? <><p>No Songs Found</p></> : 
    <>
    <h2>Songs</h2>
    {/* {listSongs && listSongs?.map(song=><ListSongTile song={song} />)} */}
    </>
    }
    </>
    )
}