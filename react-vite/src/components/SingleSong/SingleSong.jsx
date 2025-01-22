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
import { TbMusicPlus } from 'react-icons/tb';
import AddSongModal from '../AddSongModal';

export default function SingleSong() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state=>state.session.user);
    const { songId } = useParams();

    useEffect(() => {
            dispatch(thunkAllSongs());
            if(user)dispatch(thunkSongLyrics(songId))
        }, [dispatch, songId, user]);

    const songs = useSelector(state=>state.songs.allSongs);
    const song = songs[songId];
    const lyrics = useSelector(state=>state.lyrics.songLyrics);
    const songOwner = user?.id === song?.owner_id;

    let likes;

    if (song?.likes) likes = song?.likes;
 

    return (
    <div className='single-song-page'>
        <div className='song-info'>
            <div className='song-img-info' id='song-page'>
                <img id='song' src={song?.album_art} />
                <div className='info' id='song'>
                    <h1 className='title-likes'>
                        {song?.title} 
                        {likes && user && 
                        <CheckLikes user={user} songId={songId} />}
                    </h1>
                    {user && 
                    <OpenModalMenuItem
                    itemText={<button><TbMusicPlus /> Add to Playlist</button>}
                    modalComponent={<AddSongModal songId={song?.id} user={user} />}
                    />
                    }
                    <h4>From: <b>{song?.anime}</b></h4>
                    <h4>Album: <b>{song?.album_name}</b></h4>
                    <h4>Artist: <b>{song?.artist}</b></h4> 
                    
                </div>
                    {user && songOwner &&
                    <div className='buttons' id='song-page'>
                        <OpenModalMenuItem
                        itemText={<button>Edit Song</button>} 
                        modalComponent={<EditSongModal song={song} />}
                        />
                        <OpenModalMenuItem
                        itemText={<button id='reverse'>Delete Song</button>} 
                        modalComponent={<DeleteSongModal id={songId} navigate={navigate} />}
                        />
                    </div>} 
                    <div className='edit-delete-add-buttons'>
        {user && lyrics && 
            lyrics?.creator_id === user?.id &&
            <div className='buttons' id='song-page'>
                <OpenModalMenuItem
                itemText={<button>Edit Lyrics</button>}
                modalComponent={<EditLyricsModal songId={+songId} target={lyrics} />} 
                />
                <OpenModalMenuItem
                itemText={<button id='reverse'>Delete Lyrics</button>}
                modalComponent={<DeleteLyricsModal songId={songId} />} 
                />
            </div>
            }
            {user && lyrics?.message &&
            <div className='buttons' id='song-page'>
                <OpenModalMenuItem
                itemText={<button>Add Lyrics</button>}
                modalComponent={<CreateLyricsForm songId={+songId} />} 
                />
            </div>
            
            }
            </div>
        </div>      
    </div>
            

    <div className='lyrics-translation-container'>
        <div className='lyrics'>
            {lyrics && 
            Object.values(lyrics)?.length > 0 && 
            !lyrics?.message && 
            <div className='song-lyrics-translation'>
                <label>
                    <h3>Lyrics</h3>
                <p style={{'whiteSpace': 'pre-line'}}>{(lyrics?.lyrics)}</p> 
                </label>
            </div>}
        </div>
        <div className='translation'>
            {lyrics &&
            !lyrics?.message &&
            lyrics.translation && 
            <label>
                <h3>Translation</h3>
                <p style={{'whiteSpace': 'pre-line'}}>{lyrics?.translation}</p> 
            </label>}
        </div>
    </div>
    
    {!user && <p>Login to view lyrics submitted by Ani-Songs users!</p>}
    </div>
    )
}