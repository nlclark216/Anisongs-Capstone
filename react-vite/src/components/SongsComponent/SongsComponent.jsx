import './SongsComponent.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { thunkAllSongs, thunkUserSongs } from '../../redux/songs';
import { thunkAllLikes } from '../../redux/likes';
import SongTile from './SongTileComponent';
import { useNavigate, Link } from 'react-router-dom';
import { IoArrowBackOutline } from "react-icons/io5";
import { Tooltip } from 'react-tooltip';



export default function SongsComponent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state=>state.session.user);

    useEffect(() => {
            dispatch(thunkAllSongs());
            if(user) {
                dispatch(thunkUserSongs());
                dispatch(thunkAllLikes());  
            }
        }, [dispatch, user]);

    const allSongs = useSelector(state=>state.songs.allSongs);
    const userSongs = useSelector(state=>state.songs.userSongs);
    let otherSongs;
    if(allSongs) otherSongs = Object.values(allSongs).filter(list=>list?.owner_id !== user?.id);

    const likes = Object.values(useSelector(state=>state.likes.allLikes));
    const userLikes = likes.filter(like=>like.owner_id === user.id)
    console.log(userLikes)
    
    const handleClick = e => {
        e.preventDefault();
        navigate('/songs/new')
    }

    if(user) { return(
        <div className='songs-page'>
            <div className="back-button">
                <Tooltip id="tooltip" followCursor/>
                <Link
                data-tooltip-class-name="img-info"
                data-tooltip-id="tooltip"
                data-tooltip-float={true}
                data-tooltip-place="bottom"
                data-tooltip-content='Home' 
                to='/' ><IoArrowBackOutline /></Link> 
            </div>
        <h1>Songs <button onClick={handleClick}>upload a track</button> </h1>
           <div className='title-button' id='songs-page'>
            <h2>Your Songs</h2>
                
            </div>
            <div className='songs-container' id='your-songs'>
               {userSongs && 
               Object.values(userSongs)
               .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(song=>
               <SongTile key={song.id} song={song} user={user} 
               />)} 
            </div>
            {userLikes && userLikes.length > 0 && <h2>Favorites</h2>}

            {userLikes && userLikes.length > 0 && 
            <div className='songs-container' id='user-faves'>
                {userLikes
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map(like=><SongTile key={like.id} song={like?.song} user={user} />)}
            </div>
            }


            
        <h2>User Submissions</h2>
            <div className='songs-container' id='user-songs'>
            {otherSongs && 
            otherSongs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(song=>
            <SongTile key={song.id} song={song} user={user} 
            />)
            } 
            </div>
        </div>
        )}
    
        else return (
        <div className='songs-page'>
            <div className="back-button">
            <Tooltip id="tooltip" followCursor/>
                <Link
                data-tooltip-class-name="img-info"
                data-tooltip-id="tooltip"
                data-tooltip-float={true}
                data-tooltip-place="bottom"
                data-tooltip-content='Home' 
                to='/' ><IoArrowBackOutline /></Link> 
            </div>
        <h1>Songs</h1>
        <div className='songs-container'>
          {allSongs && 
          Object.values(allSongs)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map(song=>
          <SongTile key={song.id} song={song} user={user} 
          />)}  
        </div>
        </div>
        )
}