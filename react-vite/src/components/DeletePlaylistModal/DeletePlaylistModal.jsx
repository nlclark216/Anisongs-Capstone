import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeletePlaylist } from "../../redux/playlists";
import './DeletePlaylistModal';

export default function DeletePlaylistModal({id, navigate}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleSubmit = async e => {
        e.preventDefault();

        const serverResponse = await dispatch(
            thunkDeletePlaylist(id, navigate)
        );

        if (serverResponse) {
        return serverResponse;
        } else {
        alert('Playlist Deleted!');
        navigate('/playlists/')
        closeModal();
        }
    }
    return (
    <div className="modal" id="delete-playlist">
        <h1>Delete Playlist</h1>
        <p>Are you sure you want to delete this playlist?</p>
        <p className='warning'>This action cannot be undone.</p>
        <button 
        type="Submit" 
        onClick={handleSubmit}
        >Delete Playlist</button>
        <button
        id="reverse" 
        onClick={ closeModal } 
        >
        No (Go Back)
        </button> 
    </div>
    )
}