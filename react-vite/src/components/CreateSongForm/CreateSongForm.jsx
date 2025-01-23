import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from 'react-router-dom';
import { thunkCreateSong } from "../../redux/songs";
import './CreateSongForm.css'
import { IoArrowBackOutline } from "react-icons/io5";

export default function CreateSongForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const history = unstable_HistoryRouter();
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [file, setFile] = useState(null);
    const [year, setYear] = useState('');
    const [anime, setAnime] = useState('');
    const [albumName, setAlbumName] = useState('');
    const [albumArtwork, setAlbumArt] = useState('');
    const [errors, setErrors] = useState({});
    const [songLoading, setSongLoading] = useState(false);

    const handleSubmit = async (e) => {
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
            thunkCreateSong(formData)
          );

          if (serverResponse) {
            setErrors(serverResponse);
          } else {
            setSongLoading(true);
            alert('Song created!!');
            navigate('/songs/');
          }
    }

    return (
    <div className="upload-song">
        <div className="back-button">
           <Link to='/songs/' ><IoArrowBackOutline /></Link> 
        </div>
        <h1>Upload Song</h1>
        {songLoading && <p className="warning">Loading...</p>}
        {errors.server && <p className="error">{errors.server}</p>}
        <form 
        action="/posts/new" 
        method="POST" 
        encType="multipart/form-data" 
        onSubmit={handleSubmit}
        >
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
            {errors?.albumName && <p className="error">{errors?.albumName}</p>}
            <label>
                Album Art
                <input
                type="text"
                value={albumArtwork}
                onChange={(e) => setAlbumArt(e.target.value)}
                />
            </label>
            {errors.albumArtwork && <p className="error">{errors.albumArtwork}</p>}
            <div className="button-holder">
                <button
                type="submit"
                >Upload Song!</button>
            </div>
        </form>
    </div>
    )
}