import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkRemoveLike } from "../../redux/likes";
import './DeleteLikeModal.css';

export default function DeleteLikeModal({songId, likes, user}) {
    const targetArr = Object.values(likes).filter(like=>like?.song_id===+songId);
    const target = targetArr.filter(ele=>ele?.owner_id===+user?.id)
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleSubmit = async e => {
        e.preventDefault();

        const serverResponse = await dispatch(
            thunkRemoveLike(target[0]?.id)
        );

        if (serverResponse) {
        return serverResponse;
        } else {
        alert('Favorite Removed!');
        closeModal();
        }
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