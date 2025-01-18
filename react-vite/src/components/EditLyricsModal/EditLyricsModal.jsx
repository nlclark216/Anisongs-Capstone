import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkEditLyrics } from "../../redux/lyrics";
import './EditLyricsModal.css';

export default function EditLyricsModal({target, songId}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [type, setType] = useState(target?.type);
    const [lyrics, setLyrics] = useState(target?.lyrics);
    const [translation, setTranslation] = useState(target?.translation);
    const [translationLang, setTranslationLang] = useState(target?.translation_lang);
    const [errors, setErrors] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();

        const serverResponse = await dispatch(
            thunkEditLyrics({
                type,
                lyrics,
                translation,
                'translation_language': translationLang
            }, +songId)
        )

        if (serverResponse) {
        setErrors(serverResponse);
        } else {
        alert('Lyrics edits saved!');
        closeModal();
        window.location.reload();
        }
    }
    
    return (
        <div className="modal" id="edit-lyrics">
            <h1>Edit Lyrics</h1>
            {errors?.server && <p>{errors?.server}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Lyrics Type
                    <select required>
                        <option>Select--</option>
                        <option 
                        value='romaji'
                        onChange={e => setType(e.target.value)}
                        >Romaji</option>
                        <option 
                        value='hiragana'
                        onChange={e => setType(e.target.value)}
                        >Hiragana</option>
                        <option 
                        value='katakana'
                        onChange={e => setType(e.target.value)}
                        >Katakana</option>
                        <option 
                        value='kanji'
                        onChange={e => setType(e.target.value)}
                        >Kanji</option>
                    </select>
                </label>
                {errors?.type && <p>{errors?.type}</p>}
                <label>
                    Lyrics
                    <textarea
                    type="text"
                    value={lyrics}
                    onChange={(e) => setLyrics(e.target.value)}
                    required 
                    />
                </label>
                {errors?.lyrics && <p>{errors?.lyrics}</p>}
                <label>
                    Translation Text
                    <textarea
                    type="text"
                    value={translation}
                    onChange={(e) => setTranslation(e.target.value)}
                    />
                </label>
                {errors?.translation && <p>{errors?.translation}</p>}
                <label>
                    Translation Language
                    <select>
                        <option>Select--</option>
                        <option
                        value='english'
                        onChange={(e) => setTranslationLang(e.target.value)}
                        >English</option>
                        <option
                        value='spanish'
                        onChange={(e) => setTranslationLang(e.target.value)}
                        >Spanish</option>
                    </select>
                </label>
                {errors?.lyrics && <p>{errors?.lyrics}</p>}
                <button
                disabled={type !== ''} 
                type="submit">Submit Edits</button>
            </form> 
        </div>
    )
}