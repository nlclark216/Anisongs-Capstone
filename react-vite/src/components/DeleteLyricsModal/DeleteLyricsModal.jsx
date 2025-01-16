import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal.jsx";
import './DeleteLyricsModal.jsx';

export default function DeleteLyricsModal() {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();
    }
    return (
    <div className="modal">
        <h1>Remove Lyrics from Song</h1>
        <p>Are you sure you want to remove the lyrics from this song?</p>
        <p className='warning'>This action cannot be undone.</p>
        <button 
        type="Submit" 
        onClick={handleSubmit}
        >Remove Lyrics</button>
        <button 
        onClick={closeModal} 
        >
        No (Go Back)
        </button> 
    </div>
    )
}