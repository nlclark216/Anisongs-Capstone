import { Link } from "react-router-dom";
import CheckLikes from "../SingleSong/CheckLikesComponent";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import RemovePlaylistSongModal from "../RemovePlaylistSongModal";
import { TbMusicMinus } from "react-icons/tb";

export default function ListSongTile({song, user, playlist, listSongs}) {
    const isPlaylistOwner = playlist?.creator_id === user?.id;
    console.log(song)

    return (
        <div key={song?.id} className="list-song-tile">
            <img src={song?.song.albumArt} />
            <Link 
            to={`/songs/${song?.song_id}`}
            className="title"
            id="list-tile"
            >
            {song?.song.title}
            </Link>
            {user && 
            <CheckLikes songId={song?.song_id} user={user} 
            /> } 
            <p className="artist" id="list-tile">{song?.song.artist}</p>
            <p className="album" id="list-tile">{song?.song.album}</p>
            {isPlaylistOwner && 
            <button>
                <TbMusicMinus /> 
                <OpenModalMenuItem
                itemText='Remove'
                modalComponent={
                <RemovePlaylistSongModal id={song?.song_id} listSongs={listSongs} 
                />} 
                />
            </button>}
        </div> 
    )
}