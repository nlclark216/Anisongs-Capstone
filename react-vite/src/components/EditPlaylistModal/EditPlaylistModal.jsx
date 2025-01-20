import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkEditPlaylist } from "../../redux/playlists";
import './EditPlaylistModal.css'

export default function EditPlaylistModal({playlist, id}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [name, setName] = useState(playlist?.name);
    const [image, setImage] = useState(playlist?.image);
    const [errors, setErrors] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();

        const serverResponse = await dispatch(
            thunkEditPlaylist({
                name,
                image
            }, id)
            );

            if (serverResponse) {
            setErrors(serverResponse);
            } else {
            alert('Playlist edited successfully!');
            closeModal();
        }
    }
    
    return (
        <div className="modal" id="edit-playlist">
            <h1>Edit Playlist</h1>
            {errors?.server && <p className="error">{errors?.server}</p>}
            <form onSubmit={handleSubmit}>
                <p>Edit the name or image for your playlist</p>
                <label>
                    Name
                    <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required 
                    />
                </label>
                {errors?.name && <p className="error">{errors?.name}</p>}
                <label>
                    Image
                    <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    // defaultValue='/playlist-default.png'
                    />
                </label>
                {errors?.image && <p className="error">{errors?.image}</p>}
                <button
                type="submit"
                >Edit Playlist!</button>
            </form>
        </div>
    )
}