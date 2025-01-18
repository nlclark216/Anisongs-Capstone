import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkEditSong } from "../../redux/songs";
import './EditSongModal.css';

export default function EditSongModal({song}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [title, setTitle] = useState(song.title);
    const [artist, setArtist] = useState(song.artist);
    const [file, setFile] = useState(song.file);
    const [year, setYear] = useState(song.year);
    const [anime, setAnime] = useState(song.anime);
    const [albumName, setAlbumName] = useState(song.album_name);
    const [albumArtwork, setAlbumArt] = useState(song.album_art);
    const [errors, setErrors] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();

        const formData = {
                title,
                artist,
                'song_file': file,
                year,
                'album_name': albumName,
                'album_art': albumArtwork,
                anime 
            }

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
        <div>
        <h1>Upload Song</h1>
        {errors.server && <p>{errors.server}</p>}
        <form onSubmit={handleSubmit}>
            <label>
                Song Title
                <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                />
            </label>
            {errors.title && <p>{errors.title}</p>}
            <label>
                Artist
                <input
                type="text"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                required
                />
            </label>
            {errors.artist && <p>{errors.artist}</p>}
            <label>
                Upload Song File
                <input
                type="text"
                value={file}
                onChange={(e) => setFile(e.target.value)}
                required
                />
            </label>
            {errors.file && <p>{errors.file}</p>}
            <label>
                Year
                <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
                />
            </label>
            {errors.year && <p>{errors.year}</p>}
            <label>
                Anime
                <input
                type="text"
                value={anime}
                onChange={(e) => setAnime(e.target.value)}
                required
                />
            </label>
            {errors.anime && <p>{errors.anime}</p>}
            <label>
                Album Name
                <input
                type="text"
                value={albumName}
                onChange={(e) => setAlbumName(e.target.value)}
                required
                />
            </label>
            {errors.albumName && <p>{errors.albumName}</p>}
            <label>
                Album Art
                <input
                type="text"
                value={albumArtwork}
                onChange={(e) => setAlbumArt(e.target.value)}
                />
            </label>
            {errors.albumArtwork && <p>{errors.albumArtwork}</p>}
            <button
            type="submit"
            >Save Changes</button>
        </form>
        </div>
    )
}