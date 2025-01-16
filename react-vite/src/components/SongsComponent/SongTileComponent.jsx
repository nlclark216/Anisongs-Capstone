import { Link } from 'react-router-dom';
import CheckLikes from '../SingleSong/CheckLikesComponent';

export default function SongTile({song, user}) {
    let likes;

    if (song?.likes) likes = song?.likes;
    return (<div>
        {user && <CheckLikes user={user} arr={likes} />}
        <Link 
        key={song?.id} 
        className='song-tile'
        to={`/songs/${song?.id}`}
        >
            <h5>{song?.title} 
                
                </h5>
            <img src={song?.song_img} />
        </Link>
    </div>
    )
}