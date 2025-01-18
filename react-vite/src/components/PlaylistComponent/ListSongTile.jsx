import { Link } from "react-router-dom";
import CheckLikes from "../SingleSong/CheckLikesComponent";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import RemovePlaylistSongModal from "../RemovePlaylistSongModal";
import { TbMusicMinus } from "react-icons/tb";

export default function ListSongTile({song, user, playlist, listSongs}) {
    const isSongOwner = song?.song.ownerId === user?.id;
    const isPlaylistOwner = playlist?.creator_id === user?.id;

    return (
        <div key={song?.id}>
            <div>
               <Link to={`/songs/${song?.song_id}`}>
                <h3>{song?.song.title}</h3>
                </Link>
                {user && <CheckLikes songId={song?.id} user={user} /> } 
            </div>
             
            <img src={song?.song.albumArt} />
            <p>{song?.song.artist}</p>
            <p>{song?.song.album}</p>
            {isSongOwner && isPlaylistOwner && 
            <button>
                <OpenModalMenuItem
                itemText={<><TbMusicMinus /> Remove Song</>}
                modalComponent={<RemovePlaylistSongModal id={song?.song_id} listSongs={listSongs} />} 
                />
            </button>}
        </div> 
    )
}