import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkUserPlaylists } from '../../redux/playlists';
import { thunkAddPlaylistSong } from '../../redux/listSongs';
import { useModal } from '../../context/Modal';
import './AddSongModal.css';
import { Link, useNavigate } from 'react-router-dom';

export default function AddSongModal({songId, user}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedPlaylistId, setSelectedPlaylistId] = useState('');
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal();

    useEffect(() => {
        dispatch(thunkUserPlaylists())
    }, [dispatch])

    const handleEventChange = (e) => {
		const songId = e.target.value;
		setSelectedPlaylistId(songId);
	};

    const userLists = Object.values(useSelector(state=>state.playlists.userPlaylists));

    const handleSubmit = async e => {
        e.preventDefault();

        const data = {
            added_by: user?.id,
            song_id: songId,
            playlist_id: selectedPlaylistId
        }
        
        const serverResponse = await dispatch(thunkAddPlaylistSong(data, selectedPlaylistId))

        if (serverResponse) {
        setErrors(serverResponse);
        } else {
        alert('Song added!')
        closeModal();
        navigate(`/playlists/${selectedPlaylistId}`)
        window.location.reload();
    }}


    return (
        <div className='modal' id='add-playlist-song'>
            <h1>Add Song to Playlist</h1>
            {errors?.song_id && <p className="error">{errors?.song_id}</p>}
            {userLists && userLists.length === 0 && 
            <Link to='/playlists/' onClick={() => closeModal()}>Create a Playlist to get started!</Link>}
           {userLists && userLists?.length > 0 && 
           <p>To which playlist would you like to add this song?</p>}

            {userLists.length > 0 && <select
            value={selectedPlaylistId}
            onChange={handleEventChange}
            required
            >
                <option value=''>Available Playlists:</option>
                {userLists && userLists.map(e=>(
                    <option key={e?.id} value={e?.id}>
                        {e?.name}
                    </option>
                ))}
            </select>}
            {userLists.length > 0 && <button
            id='add-song'
            disabled={selectedPlaylistId === ''} 
            type='submit' 
            onClick={handleSubmit}>Add Song</button>}
        </div>
    )
}