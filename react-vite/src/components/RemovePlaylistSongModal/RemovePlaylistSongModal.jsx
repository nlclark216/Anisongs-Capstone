import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './RemovePlaylistSongModal.css';

export default function RemovePlaylistSongModal() {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();
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