import './SingleSong.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { thunkAllSongs } from '../../redux/songs';
import { thunkSongLyrics } from '../../redux/lyrics';
import { useNavigate, useParams, Link } from 'react-router-dom';
import CheckLikes from './CheckLikesComponent';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import EditSongModal from '../EditSongModal';
import DeleteSongModal from '../DeleteSongModal';
import EditLyricsModal from '../EditLyricsModal/EditLyricsModal';
import DeleteLyricsModal from '../DeleteLyricsModal';
import CreateLyricsForm from '../CreateLyricsForm';
import { TbMusicPlus } from 'react-icons/tb';
import AddSongModal from '../AddSongModal';
import { IoArrowBackOutline } from "react-icons/io5";
import { Tooltip } from 'react-tooltip';
import AudioPlayer from '../AudioPlayer';

export default function SingleSong() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state=>state.session.user);
    const [showLyrics, setShowLyrics] = useState(false);
    const { songId } = useParams();

    useEffect(() => {
            dispatch(thunkAllSongs());
            if(user)dispatch(thunkSongLyrics(songId))
        }, [dispatch, songId, user]);


    const onClick = () => {
        return setShowLyrics(!showLyrics)
    }

    const songs = useSelector(state=>state.songs.allSongs);
    const song = songs[songId];
    const lyrics = useSelector(state=>state.lyrics.songLyrics);
    const songOwner = user?.id === song?.owner_id;

    let likes;

    if (song?.likes) likes = song?.likes;
 

    return (
        <>
        <div className="back-button">
            <Tooltip id="tooltip" followCursor/>
            <Link
            data-tooltip-id="tooltip"
            data-tooltip-float={true}
            data-tooltip-place="bottom"
            data-tooltip-content='Songs'
             to='/songs/' ><IoArrowBackOutline /></Link> 
        </div>
        <div className='single-song-page'>
        
        <div className='song-info'>
            <div className='song-img-info' id='song-page'>
                <img id='song' className='single-song-img' src={song?.album_art} />
                <div className='info' id='song'>
                    <h1 className='title-likes'>
                        {song?.title}
                        <div className='add-remove-icons'>
                        {user &&
                         <div
                        data-tooltip-id="tooltip"
                        data-tooltip-float={true}
                        data-tooltip-place="bottom"
                        data-tooltip-content='Add to Playlist'
                         >
                            <OpenModalMenuItem
                            itemText={<TbMusicPlus />}
                            modalComponent={<AddSongModal songId={song?.id} user={user} />}
                            />
                        </div>
                        }
                        {likes && user && 
                        <CheckLikes user={user} songId={songId} />}
                        </div>
                    </h1>
                    <div className='song-info-anime'>
                        <h4>Anime: <b>{song?.anime}</b></h4>
                        <h4>Album: <b>{song?.album_name}</b></h4>
                        <h4>Artist: <b>{song?.artist}</b></h4>
                    </div>
                    {user && song?.file !== 'song file url' &&
                    <AudioPlayer url={song?.file} />
                    }
                    
                     
                    
                </div>
                <div className='buttons-container'>
                {user && songOwner &&
                <div className='buttons-song-page' >
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
                {user && songOwner && lyrics?.message &&
                <div className='buttons-song-page' >
                    <OpenModalMenuItem
                    itemText={<button>Add Lyrics</button>}
                    modalComponent={<CreateLyricsForm songId={+songId} />} 
                    />
                </div>
                }
                </div>
                
            </div>
        </div>      
    </div>

    {user && 
    lyrics && 
    !lyrics?.message && 
    <div className='show-lyrics'>
       <button className='lyrics-show' onClick={onClick}>{!showLyrics ? 'Show Lyrics' : 'Hide Lyrics'}</button> 
    </div>
    }

    {showLyrics && 
        lyrics?.creator_id === user?.id &&
            <div className='buttons-song-page' id='edit-delete' >
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
            

    {showLyrics && <div className='lyrics-translation-container'>
        <div className='lyrics'>
            {lyrics && 
            Object.values(lyrics)?.length > 0 && 
            !lyrics?.message && 
            <div className='song-lyrics-translation'>
            
            <h3>Lyrics</h3>
            <p style={{'whiteSpace': 'pre-line'}}>{(lyrics?.lyrics)}</p> 
                
            </div>}
        </div>
        <div className='translation'>
            {lyrics &&
            !lyrics?.message &&
            lyrics.translation && 
            <div className='song-lyrics-translation'>
            <h3>Translation</h3>
            <p style={{'whiteSpace': 'pre-line'}}>{lyrics?.translation}</p> 
            </div>
            }
        </div>
    </div>}

    {!user && <p className='login-for-lyrics'>Login to view lyrics submitted by Ani-Songs users!</p>}
    </div>
        </>
    
    )
}