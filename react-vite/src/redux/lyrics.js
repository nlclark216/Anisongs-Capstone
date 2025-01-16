import { csrfFetch } from "./csrf";

const LOAD_LYRICS = 'lyrics/loadLyrics';
const SONG_LYRICS = 'lyrics/songLyrics';

const getLyrics = lyrics => ({
    type: LOAD_LYRICS,
    payload: lyrics
})

const songLyrics = lyrics => ({
    type: SONG_LYRICS,
    payload: lyrics
})

export const thunkAllLyrics = () => async dispatch => {
    const res = await fetch('/api/lyrics/');
    if(res.ok){
        const data = await res.json();
        if (data.errors) {return;}
        dispatch(getLyrics(data))
    }
}

export const thunkSongLyrics = (id) => async dispatch => {
    const res = await csrfFetch(`/api/songs/${id}/lyrics`);
    if(res.ok){
        const data = await res.json();
        if (data.errors) {return;}
        dispatch(songLyrics(data))
    }
}

const initialState = { allLyrics: {}, songLyrics: {} }

export default function lyricsReducer(state=initialState, action) {
    switch(action.type) {
        case LOAD_LYRICS: {
            const newState = { ...state, allLyrics: {}};
            const lyricArr = action.payload.lyrics;
            lyricArr.forEach(l=>{
                newState.allLyrics[l.id] = l
            })
            return newState
        }
        case SONG_LYRICS: 
        return { ...state, songLyrics: action.payload };
        default:
            return state;
    }
}