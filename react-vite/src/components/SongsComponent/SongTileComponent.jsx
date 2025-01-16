import { Link } from 'react-router-dom';

export default function SongTile({song}) {
    return (
        <Link 
        key={song?.id} 
        className='song-tile'
        to={`/songs/${song?.id}`}
        >
            <h5>{song?.title}</h5>
            <img src={song?.song_img} />
        </Link>
    )
}