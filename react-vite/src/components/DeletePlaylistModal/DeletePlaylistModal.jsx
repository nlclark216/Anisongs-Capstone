import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeletePlaylist } from "../../redux/playlists";
import './DeletePlaylistModal';
import { useNavigate } from "react-router-dom";

export default function DeletePlaylistModal({id}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();

        const serverResponse = await dispatch(
            thunkDeletePlaylist(id, navigate)
        );

        if (serverResponse) {
        return serverResponse;
        } else {
        alert('Playlist Deleted!');
        closeModal();
        }
    }
    return (
    <div className="modal">
        <h1>Delete Playlist</h1>
        <p>Are you sure you want to delete this playlist?</p>
        <p className='warning'>This action cannot be undone.</p>
        <button 
        type="Submit" 
        onClick={handleSubmit}
        >Delete Playlist</button>
        <button 
        onClick={closeModal} 
        >
        No (Go Back)
        </button> 
    </div>
    )
}