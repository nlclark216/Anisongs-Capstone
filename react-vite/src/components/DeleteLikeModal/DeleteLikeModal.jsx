import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './DeleteLikeModal.css';

export default function DeleteLikeModal({song}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();
    }
    return (
    <div className="modal">
        <h1>Remove Favorite</h1>
        <p>Are you sure you want to remove this song from your Favorites?</p>
        <p className='warning'>This action cannot be undone.</p>
        <button 
        type="Submit" 
        onClick={handleSubmit}
        >Remove Favorite</button>
        <button 
        onClick={closeModal} 
        >
        No (Go Back)
        </button> 
    </div>
    )
}