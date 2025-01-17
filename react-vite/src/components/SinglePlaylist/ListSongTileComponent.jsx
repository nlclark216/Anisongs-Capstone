import RemovePlaylistSongModal from '../RemovePlaylistSongModal';
import DisplayLyricsModal from '../DisplayLyricsModal';
import EditLyricsModal from '../EditLyricsModal/EditLyricsModal';
import CheckLikes from '../SingleSong/CheckLikesComponent';
import { CiSquareRemove } from "react-icons/ci";
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import { Link } from 'react-router-dom';

export default function ListSongTile({song}) {
    const handleClick = e => {
        e.preventDefault();
    }

    return (
        <div key={song?.id}>
            <Link to={`/songs/${song?.id}`}><h3>{song?.song.title}</h3></Link>
            <img src={song?.song.albumArt} />
            <p>{song?.song.artist}</p>
            <p>{song?.song.album}</p>
            {/* {user && <button onClick={handleClick}><OpenModalMenuItem
            itemText='Lyrics' 
            modalComponent={<DisplayLyricsModal />}
            /></button>} */}
            {/* {user && user?.id === song?.song.ownerId &&
            <button onClick={handleClick}><OpenModalMenuItem
            itemText='Edit Lyrics' 
            modalComponent={<EditLyricsModal />}
            /></button>} */}
            {/* {user && <CheckLikes arr={song?.song.likes} user={user} />}
            {user && user?.id === playlist?.creator_id &&
            <button><OpenModalMenuItem
            itemText={<span>Remove <CiSquareRemove /></span>}
            modalComponent={<RemovePlaylistSongModal />} 
            /></button>} */}
        </div>
    )
    }