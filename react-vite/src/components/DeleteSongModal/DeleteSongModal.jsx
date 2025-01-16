import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import './DeleteSongModal.css';

export default function DeleteSongModal() {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();
    }

    return (
    <div className="modal">
        <h1>Delete Song</h1>
        <p>Are you sure you want to delete this song?</p>
        <p className='warning'>This action cannot be undone.</p>
        <button 
        type="Submit" 
        onClick={handleSubmit}
        >Delete Song</button>
        <button 
        onClick={closeModal} 
        >
        No (Go Back)
        </button> 
    </div>
    )
}
