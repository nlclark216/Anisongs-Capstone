import { Link } from 'react-router-dom';
import CheckLikes from '../SingleSong/CheckLikesComponent';

export default function SongTile({song, user}) {
    let likes;

    if (song?.likes) likes = song?.likes;
    return (<div>    
        <Link 
        key={song?.id} 
        className='song-tile'
        to={`/songs/${song?.id}`}
        >
            <h4>
                {song?.title} 
            </h4>
            <img src={song?.song_img} />
        </Link>
        {user && likes && <CheckLikes user={user} arr={likes} songId={song?.id} />}
    </div>
    )
}