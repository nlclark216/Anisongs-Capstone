import './SingleSong.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { thunkAllSongs } from '../../redux/songs';
import { thunkSongLyrics } from '../../redux/lyrics';
import { useNavigate, useParams } from 'react-router-dom';
import CheckLikes from './CheckLikesComponent';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import EditSongModal from '../EditSongModal';
import DeleteSongModal from '../DeleteSongModal';
import EditLyricsModal from '../EditLyricsModal/EditLyricsModal';
import DeleteLyricsModal from '../DeleteLyricsModal';
import CreateLyricsForm from '../CreateLyricsForm';

export default function SingleSong() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state=>state.session.user);
    const { songId } = useParams()

    useEffect(() => {
            dispatch(thunkAllSongs());
            dispatch(thunkSongLyrics(songId))
        }, [dispatch, songId]);

    const songs = useSelector(state=>state.songs.allSongs);
    const song = songs[songId];

    if(!song) navigate('/');
    const lyrics = useSelector(state=>state.lyrics.songLyrics);
    const songOwner = user?.id === song?.owner_id;


    let likes;

    if (song?.likes) likes = song?.likes;
 

    return (
    <>
    <img src={song?.album_art} />
    <h1>{song?.title} {likes && user && <CheckLikes user={user} songId={songId} />}</h1>
    <p>From: <b>{song?.anime}</b></p>
    <p>Album: <b>{song?.album_name}</b></p>
    <p>Artist: <b>{song?.artist}</b></p>
   {user && songOwner &&
   <div>
        <button>
            <OpenModalMenuItem
            itemText='Edit Song' 
            modalComponent={<EditSongModal song={song} />}
            />
            </button>
        <button>
            <OpenModalMenuItem
            itemText='Delete Song' 
            modalComponent={<DeleteSongModal id={songId} navigate={navigate} />}
            />
        </button>
    </div>}
    {lyrics && Object.values(lyrics)?.length > 0 && !lyrics?.message && <div className='song-lyrics-translation'>
        <label>
            <h4>Lyrics</h4>
           <p style={{'whiteSpace': 'pre-line'}}>{(lyrics?.lyrics)}</p> 
        </label>
        {lyrics.translation && <label>
            <h4>Translation</h4>
            <p style={{'whiteSpace': 'pre-line'}}>{lyrics?.translation}</p> 
        </label>}
    </div>}
    {user && lyrics && lyrics?.creator_id === user?.id &&
    <div>
        <button>
            <OpenModalMenuItem
            itemText='Edit Lyrics'
            modalComponent={<EditLyricsModal songId={+songId} target={lyrics} />} 
            />
        </button>
        <button>
            <OpenModalMenuItem
            itemText='Delete Lyrics'
            modalComponent={<DeleteLyricsModal songId={songId} />} 
            />
        </button> 
    </div>
    }
    {user && lyrics?.message &&
    <button>
        <OpenModalMenuItem
        itemText='Add Lyrics'
        modalComponent={<CreateLyricsForm songId={+songId} />} 
        />
    </button>
    }
    {!user && <p>Login to view lyrics submitted by Ani-Songs users!</p>}
    </>
    )
}