import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeletePlaylistSong } from "../../redux/listSongs";
import './RemovePlaylistSongModal.css';

export default function RemovePlaylistSongModal({id}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleSubmit = async e => {
        e.preventDefault();

        await dispatch(
            thunkDeletePlaylistSong(id)
        );

        alert('Song Removed!');
        window.location.reload();
        closeModal();

    }

    return (
    <div className="modal" id="remove-playlist-song">
        <h1>Remove Song from Playlist</h1>
        <p>Are you sure you want to remove this song from your playlist?</p>
        <p className='warning'>This action cannot be undone.</p>
        <button 
        type="Submit" 
        onClick={handleSubmit}
        >Remove Song</button>
        <button
        id="reverse" 
        onClick={ closeModal } 
        >
        No (Go Back)
        </button> 
    </div>
    )
}