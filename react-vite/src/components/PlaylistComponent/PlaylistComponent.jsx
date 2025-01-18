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
import { TbMusicPlus } from "react-icons/tb";
import { FaPlay } from "react-icons/fa";
import AddSongModal from '../AddSongModal/AddSongModal';

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

    
    const allPlaylists = useSelector(state=>state.playlists.allPlaylists);
    const targetPlaylist = allPlaylists[playlistId];
    const songs = useSelector(state=>state.songs.playlistSongs);
    const isOwner = targetPlaylist?.creator_id === user?.id;

    const listSongs = useSelector(state=>state.playlistSongs.allPlaylistSongs)

    return (
        <div>
            <h1>{targetPlaylist?.name} {user && <button onClick={()=>alert('Coming soon...')}><FaPlay />Play</button>}</h1>
            <img src={targetPlaylist?.image} />
            <h2>Created By: {!isOwner ? targetPlaylist?.creator : 'You'} 
                {isOwner && 
                <button>
                    <OpenModalMenuItem
                    itemText='Edit Playlist'
                    modalComponent={<EditPlaylistModal id={playlistId} playlist={targetPlaylist} />} 
                    />
                </button>}
                {isOwner && 
                <button>
                    <OpenModalMenuItem
                    itemText='Delete Playlist'
                    modalComponent={<DeletePlaylistModal navigate={navigate} id={playlistId} />} 
                    />
                </button>}
            </h2>
            
            {isOwner && 
            <button>
                <OpenModalMenuItem
                itemText={<><TbMusicPlus /> Add Song</>}
                modalComponent={<AddSongModal />}
                />
            </button>}
            {songs && <h3>Songs</h3>}
            {songs && Object.values(songs).map(song=><ListSongTile key={song.id} song={song} user={user} playlist={targetPlaylist} listSongs={listSongs}/>)}
            
        </div>
    )
}