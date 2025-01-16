import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './CreateSongModal.css'

export default function CreateSongModal() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [file, setFile] = useState('');
    const [year, setYear] = useState('');
    const [albumName, setAlbumName] = useState('');
    const [albumArtwork, setAlbumArt] = useState('');
    return (
    <div>
        <h1>Upload Song</h1>
    </div>
    )
}