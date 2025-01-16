import './SinglePlaylist.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { thunkAllPlaylists } from '../../redux/playlists';
import { thunkPlaylistSongs } from '../../redux/songs';
import { FaPlay } from "react-icons/fa";
import { TbMusicPlus } from "react-icons/tb";
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import AddSongModal from '../AddSongModal/AddSongModal';
import DisplayLyricsModal from '../DisplayLyricsModal';
import DeletePlaylistModal from '../DeletePlaylistModal';
import RemovePlaylistSongModal from '../RemovePlaylistSongModal';
import EditPlaylistModal from '../EditPlaylistModal';
import EditLyricsModal from '../EditLyricsModal/EditLyricsModal';
import CheckLikes from '../SingleSong/CheckLikesComponent';
import { CiSquareRemove } from "react-icons/ci";


export default function SinglePlaylist() {
    const dispatch = useDispatch();
    const user = useSelector(state=>state.session.user);
    const { playlistId } = useParams();

    const handleClick = e => {
        e.preventDefault();
    }

    useEffect(() => {
        dispatch(thunkAllPlaylists());
        dispatch(thunkPlaylistSongs(playlistId))
    }, [dispatch, playlistId]);

    const playlists = useSelector(state=>state.playlists.allPlaylists);
    const playlist = playlists[playlistId]
    const listSongs = Object.values(useSelector(state=>state.songs.playlistSongs));
    console.log(listSongs)

    const listSongTile = (song) => {
        return (
            <div key={song?.id}>
                <Link to={`/songs/${song?.id}`}><h3>{song?.song.title}</h3></Link>
                <img src={song?.song.albumArt} />
                <p>{song?.song.artist}</p>
                <p>{song?.song.album}</p>
                {user && <button onClick={handleClick}><OpenModalMenuItem
                itemText='Lyrics' 
                modalComponent={<DisplayLyricsModal />}
                /></button>}
                {user && user?.id === song?.song.ownerId &&
                <button onClick={handleClick}><OpenModalMenuItem
                itemText='Edit Lyrics' 
                modalComponent={<EditLyricsModal />}
                /></button>
                }
                {user && <CheckLikes arr={song?.song.likes} user={user} />}
                {user && user?.id === playlist?.creator_id &&
                <button><OpenModalMenuItem
                itemText={<span>Remove <CiSquareRemove /></span>}
                modalComponent={<RemovePlaylistSongModal />} 
                /></button>
                }
            </div>
        )
    }

    return (
    <>
    <img src={playlist?.image} />
    <div>
       <h1>{playlist?.name}</h1>
       {user && user?.id === playlist?.creator_id && <button>
        <OpenModalMenuItem
        itemText='Edit'
        modalComponent={<EditPlaylistModal />} 
        /></button> }
    </div>
    
    <p>Created By: {playlist?.creator}</p>
    {user && <div>
        <button onClick={()=>alert('Coming soon...')}><FaPlay />Play</button>
        {user?.id === playlist?.creator_id && <button>
        <OpenModalMenuItem
        itemText={<><TbMusicPlus /> Add Song</>}
        modalComponent={<AddSongModal />} 
        /></button>}
        {user?.id === playlist?.creator_id && <button><OpenModalMenuItem
        itemText='Delete Playlist'
        modalComponent={<DeletePlaylistModal />} 
        /></button>}
    </div>}
    {listSongs.length === 0 ? <><p>No Songs Found</p></> : 
    <>
    <h2>Songs</h2>
    {listSongs.map(song=>listSongTile(song))}
    </>
    }
    </>
    )
}