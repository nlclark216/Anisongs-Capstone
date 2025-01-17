import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkAddLike } from "../../redux/likes";
import './AddLikeModal.css';

export default function AddLikeModal({songId, user}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            'owner_id': +user.id,
            'song_id': +songId
        }
        dispatch(thunkAddLike(songId, data));
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