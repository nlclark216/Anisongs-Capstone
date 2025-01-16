import './SinglePlaylist.css'
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
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
import AddLikeModal from '../AddLikeModal';
import DeleteLikeModal from '../DeleteLikeModal';
import DeletePlaylistModal from '../DeletePlaylistModal';


export default function SinglePlaylist() {
    const dispatch = useDispatch();
    const user = useSelector(state=>state.session.user);
    const { playlistId } = useParams();

    const listSongTile = (song) => {
        const checkLikes = arr => {
           const target = arr.filter(ele=>ele?.ownerId===user.id)
           if(target.length > 0) return (<button><OpenModalMenuItem
            itemText={<FaStar />}
            modalComponent={<DeleteLikeModal />} 
            /></button>)
           else return (<button>
            <OpenModalMenuItem
            itemText={<FaRegStar />}
            modalComponent={<AddLikeModal />} 
            /></button>)
        }
        return (
            <div key={song?.id}>
                <Link to={`/songs/${song?.id}`}>{song?.song.title}</Link>
                <p>{song?.song.artist}</p>
                <p>{song?.song.album}</p>
                <button><OpenModalMenuItem
                itemText='Lyrics' 
                modalComponent={<DisplayLyricsModal />}
                /></button>
                <p>{checkLikes(song?.song.likes)}</p>
            </div>
        )
    }

    useEffect(() => {
        dispatch(thunkAllPlaylists());
        dispatch(thunkPlaylistSongs(playlistId))
    }, [dispatch, playlistId]);

    const playlists = useSelector(state=>state.playlists.allPlaylists);
    const playlist = playlists[playlistId]
    const listSongs = Object.values(useSelector(state=>state.songs.playlistSongs));

    const handleClick = e => {
        e.preventDefault();
    }

    return (
    <>
    <img src={playlist?.image} />
    <h1>{playlist?.name}</h1>
    <p>Created By: {listSongs[0]?.playlist.creator}</p>
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