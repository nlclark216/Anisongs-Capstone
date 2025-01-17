import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkAddLike } from "../../redux/songs";
import './AddLikeModal.css';

export default function AddLikeModal({songId}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(thunkAddLike(songId));
        window.location.reload();
    }

    return(
    <div className="modal">
        <h1>Add Favorite</h1>
        <p>Add this song your Favorites?</p>
        <button 
        type="Submit" 
        onClick={handleSubmit}
        >Add Favorite</button>
        <button 
        onClick={closeModal} 
        >
        No (Go Back)
        </button> 
    </div>
    )
}