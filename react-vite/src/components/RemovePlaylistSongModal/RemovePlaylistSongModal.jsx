import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkAllPlaylistSongs, thunkDeletePlaylistSong } from "../../redux/listSongs";
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
    <div className="modal">
        <h1>Remove Song from Playlist</h1>
        <p>Are you sure you want to remove this song from your playlist?</p>
        <p className='warning'>This action cannot be undone.</p>
        <button 
        type="Submit" 
        onClick={handleSubmit}
        >Remove Song</button>
        <button 
        onClick={closeModal} 
        >
        No (Go Back)
        </button> 
    </div>
    )
}