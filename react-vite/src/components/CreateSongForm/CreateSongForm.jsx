import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { thunkCreateSong } from "../../redux/songs";
import './CreateSongForm.css'

export default function CreateSongForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [file, setFile] = useState('');
    const [year, setYear] = useState('');
    const [anime, setAnime] = useState('');
    const [albumName, setAlbumName] = useState('');
    const [albumArtwork, setAlbumArt] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        const serverResponse = await dispatch(
            thunkCreateSong({
              title,
              artist,
              'song_file': file,
              year,
              'album_name': albumName,
              'album_art': albumArtwork || '/song-default.png',
              anime,
            })
          );

          if (serverResponse) {
            setErrors(serverResponse);
          } else {
            alert('Song created!!');
            navigate('/songs/');
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
            {errors?.albumName && <p>{errors?.albumName}</p>}
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
            >Create Song!</button>
        </form>
    </div>
    )
}