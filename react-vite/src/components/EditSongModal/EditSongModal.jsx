import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkEditSong } from "../../redux/songs";
import './EditSongModal.css';

export default function EditSongModal({song}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [title, setTitle] = useState(song?.title);
    const [artist, setArtist] = useState(song?.artist);
    const [file, setFile] = useState(null);
    const [year, setYear] = useState(song?.year);
    const [anime, setAnime] = useState(song?.anime);
    const [albumName, setAlbumName] = useState(song?.album_name);
    const [albumArtwork, setAlbumArt] = useState(song?.album_art);
    const [errors, setErrors] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('artist', artist);
        formData.append('song_file', file);
        formData.append('year', year);
        formData.append('album_name', albumName);
        if(albumArtwork !== '') {formData.append('album_art', albumArtwork)}
        else {formData.append('album_art', '/song-default.png')}
        formData.append('anime', anime)

        const serverResponse = await dispatch(
            thunkEditSong(formData, song.id)
        )

        if (serverResponse) {
        setErrors(serverResponse);
        } else {
        alert('Song edits saved!');
        closeModal();
        }
    }


    return (
        <div className="modal" id="sign-up">
        <h1>Edit Song</h1>
        {errors.server && <p className="error">{errors.server}</p>}
        <form
        action="/posts/new" 
        method="POST" 
        encType="multipart/form-data" 
        className="signup-form" 
        onSubmit={handleSubmit}>
            <label>
                Song Title
                <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                />
            </label>
            {errors.title && <p className="error">{errors.title}</p>}
            <label>
                Artist
                <input
                type="text"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                required
                />
            </label>
            {errors.artist && <p className="error">{errors.artist}</p>}
            <label>
                Upload Song File
                <input
                type="file"
                accept="audio/*"
                defaultValue={file}
                onChange={(e) => setFile(e.target.files[0])}
                required
                />
            </label>
            {errors.file && <p className="error">{errors.file}</p>}
            <label>
                Year
                <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
                />
            </label>
            {errors.year && <p className="error">{errors.year}</p>}
            <label>
                Anime
                <input
                type="text"
                value={anime}
                onChange={(e) => setAnime(e.target.value)}
                required
                />
            </label>
            {errors.anime && <p className="error">{errors.anime}</p>}
            <label>
                Album Name
                <input
                type="text"
                value={albumName}
                onChange={(e) => setAlbumName(e.target.value)}
                required
                />
            </label>
            {errors.albumName && <p className="error">{errors.albumName}</p>}
            <label>
                Album Art
                <input
                type="text"
                value={albumArtwork}
                onChange={(e) => setAlbumArt(e.target.value)}
                />
            </label>
            {errors.albumArtwork && <p className="error">{errors.albumArtwork}</p>}
            <button
            type="submit"
            >Save Changes</button>
        </form>
        </div>
    )
}