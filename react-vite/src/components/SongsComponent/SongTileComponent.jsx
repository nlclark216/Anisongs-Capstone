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
    return (
    <div className='song-tile' id='landing'>
        <div className='favorite-add' id='landing'>
            {user && 
            <OpenModalMenuItem
            itemText={
            <button className='add-playlist-song'>
                <TbMusicPlus /> Add to Playlist
            </button>}
            modalComponent={
            <AddSongModal songId={song.id} user={user} closeModal={ closeModal } 
            />}
            />
            }
        </div> 
        <img src={imgSrc(song)} />   
        
            
        <h4 className='title-likes'>
        <Link 
        key={song?.id} 
        className='song-tile-title'
        to={`/songs/${song?.id}`}
        >{song?.title}
        </Link>
        {user && likes && 
        <CheckLikes user={user} songId={song?.id} />}
        </h4>
        <p>{song?.artist}</p>
        
    </div>
    )
}