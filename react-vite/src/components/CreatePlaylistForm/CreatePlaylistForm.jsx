import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkCreatePlaylist } from "../../redux/playlists";
import './CreatePlaylistForm.css';

export default function CreatePlaylistForm() {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [name, setName] = useState('');
    const [image, setImage] = useState();
    const [errors, setErrors] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();

        const serverResponse = await dispatch(
            thunkCreatePlaylist({
                name,
                image
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
        <div>
            <h1>Create Playlist</h1>
            {errors?.server && <p className="error">{errors?.server}</p>}
            <form onSubmit={handleSubmit}>
                <p>Choose a name for your new playlist! (image is optional)</p>
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
                >Create Playlist!</button>
            </form>
        </div>
    )
}