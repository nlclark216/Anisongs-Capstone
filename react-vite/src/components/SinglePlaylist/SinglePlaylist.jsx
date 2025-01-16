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
import CheckLikes from '../SingleSong/CheckLikesComponent';


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
                <Link to={`/songs/${song?.id}`}>{song?.song.title}</Link>
                <p>{song?.song.artist}</p>
                <p>{song?.song.album}</p>
                <button onClick={handleClick}><OpenModalMenuItem
                itemText='Lyrics' 
                modalComponent={<DisplayLyricsModal />}
                /></button>
                {user && user.id === playlist.creator_id &&
                <button onClick={handleClick}><OpenModalMenuItem
                itemText='Edit Lyrics' 
                // modalComponent={<DisplayLyricsModal />}
                /></button>
                }
                {user && user.id === song?.creator_id}
                {user && <CheckLikes arr={song?.song.likes} user={user} />}
            </div>
        )
    }

    return (
    <>
    <img src={playlist?.image} />
    <h1>{playlist?.name}</h1>
    <p>Created By: {playlist?.creator}</p>
    <div>
        <button onClick={()=>alert('Coming soon...')}><FaPlay />Play</button>
        <button>
        <OpenModalMenuItem
        itemText={<><TbMusicPlus /> Add Song</>}
        modalComponent={<AddSongModal />} 
        /></button>
        <button><OpenModalMenuItem
        itemText='Delete Playlist'
        modalComponent={<DeletePlaylistModal />} 
        /></button>
    </div>
    {listSongs.length === 0 ? <><p>No Songs Found</p></> : 
    <>
    <h3>Songs</h3>
    {listSongs.map(song=>listSongTile(song))}
    </>
    }
    </>
    )
}