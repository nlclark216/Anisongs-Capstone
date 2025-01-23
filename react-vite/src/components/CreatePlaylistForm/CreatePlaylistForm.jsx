import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkCreatePlaylist } from "../../redux/playlists";
import './CreatePlaylistForm.css';

export default function CreatePlaylistForm() {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [name, setName] = useState('');
    // const [image, setImage] = useState();
    const [errors, setErrors] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();

        const serverResponse = await dispatch(
            thunkCreatePlaylist({
                name
            })
            );

            if (serverResponse) {
            setErrors(serverResponse);
            } else {
            alert('Playlist created!');
            closeModal();
            window.location.reload();
        }
    }

    return (
        <div className="modal" id="create-playlist">
            <h1>Create New Playlist</h1>
            {errors.server && <p className="error">{errors?.server}</p>}
            <form onSubmit={handleSubmit}>
                <p>Choose a name for your new playlist</p>
                <input
                type="text"
                placeholder="New Playlist Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
                />
                {errors.name && <p className="error">{errors.name}</p>}
                <button
                type="submit"
                >Create Playlist!</button>
            </form>
        </div>
    )
}