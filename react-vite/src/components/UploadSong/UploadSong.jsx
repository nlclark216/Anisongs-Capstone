import './UploadSong.css';
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function UploadSong() {
    const dispatch = useDispatch();
    const [file, setFile] = useState('');
    
    return (
        <div>
            <h1>Upload Song</h1>
            <form action="/posts/new" method="POST" enctype="multipart/form-data">

            </form>
        </div>
    )
}