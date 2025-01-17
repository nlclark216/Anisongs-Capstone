import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteSong } from "../../redux/songs";
import './DeleteSongModal.css';

export default function DeleteSongModal({id, navigate}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleSubmit = async e => {
        e.preventDefault();

        const serverResponse = await dispatch(
            thunkDeleteSong(id, navigate)
        );

        if (serverResponse) {
        return serverResponse;
        } else {
        alert('Song Deleted!');
        closeModal();
        }
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
