import { Link } from "react-router-dom";
import CheckLikes from "../SingleSong/CheckLikesComponent";

export default function ListSongTile({song, user}) {
    const handleClick = e => {
        e.preventDefault();
    }
    const isOwner = song.song.ownerId === user.id;
    console.log(isOwner)

    return (
        <div key={song?.id}>
            <div>
               <Link to={`/songs/${song?.id}`}>
                <h3>{song?.song.title}</h3>
                </Link>
                {user && <CheckLikes songId={song?.id} user={user} /> } 
            </div>
             
            <img src={song?.song.albumArt} />
            <p>{song?.song.artist}</p>
            <p>{song?.song.album}</p>
            {isOwner && <button>Remove Song</button>}
        </div> 
    )
}