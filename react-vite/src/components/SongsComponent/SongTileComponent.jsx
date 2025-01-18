import { Link } from 'react-router-dom';
import CheckLikes from '../SingleSong/CheckLikesComponent';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import AddSongModal from '../AddSongModal';
import { TbMusicPlus } from 'react-icons/tb';
import { useModal } from '../../context/Modal';

export default function SongTile({song, user}) {
    const { closeModal } = useModal();
    const imgSrc = song => {
        if(song?.album_art !== "/album-img.png") {return song?.album_art}
        else return '/song-default.png'
    }

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
            </h4></Link>
            <img src={imgSrc(song)} />
        
        {user && likes && <CheckLikes user={user} arr={likes} songId={song?.id} />}
        {user && 
            <button>
                <OpenModalMenuItem
                itemText={<><TbMusicPlus /> Add Song</>}
                modalComponent={<AddSongModal songId={song.id} user={user} closeModal={ closeModal } />}
                />
            </button>}
    </div>
    )
}