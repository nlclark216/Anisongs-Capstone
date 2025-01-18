import { csrfFetch } from "./csrf";

const LOAD_LYRICS = 'lyrics/loadLyrics';
const SONG_LYRICS = 'lyrics/songLyrics';
const ADD_LYRICS = 'lyrics/addLyrics';
const REMOVE_LYRICS = 'lyrics/removeLyrics';
const EDIT_LYRICS = 'lyrics/editLyrics';

const getLyrics = lyrics => ({
    type: LOAD_LYRICS,
    payload: lyrics
})

const songLyrics = lyrics => ({
    type: SONG_LYRICS,
    payload: lyrics
})

const addLyrics = payload => ({
    type: ADD_LYRICS,
    payload
})

const deleteLyrics = id => ({
    type: REMOVE_LYRICS,
    payload: id
})

const editLyrics = payload => ({
    type: EDIT_LYRICS,
    payload
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

export const thunkAddLyrics = (formData, id) => async dispatch => {
    const res = await csrfFetch(`/api/songs/${+id}/lyrics`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    });
    if(res.ok) {
        const data = await res.json();
        dispatch(addLyrics(data));
        window.location.reload()
    } else if (res.status < 500) {
    const errorMessages = await res.json();
    return errorMessages
    } else {
    return { server: "Something went wrong. Please try again" }
    }
}

export const thunkDeleteLyrics = (id) => async dispatch => {
    const res = await fetch(`/api/songs/${id}/lyrics`, {method: 'DELETE'});
    if(res.ok) {
        dispatch(deleteLyrics(+id));
        window.location.reload();
    } else if (res.status < 500) {
    const errorMessages = await res.json();
    return errorMessages
    } else {
    return { server: "Something went wrong. Please try again" }
    }
}

export const thunkEditLyrics = (formData, id) => async dispatch => {
    const res = await fetch(`/api/songs/${+id}/lyrics`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    });
    if(res.ok) {
    const updatedLyrics = await res.json();
    dispatch(editLyrics(updatedLyrics));
    window.location.reload();
    } else if (res.status < 500) {
    const errorMessages = await res.json();
    return errorMessages
    } else {
    return { server: "Something went wrong. Please try again" }
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
        case ADD_LYRICS: {
            const newState = {
                allLyrics: {
                    ...state.allLyrics,
                    [action.payload.id]: action.payload
                }
            }
            return newState;
        }
        case REMOVE_LYRICS: {
            const newState = {...state};
            delete newState.allLyrics[action.payload];
            return newState;
        }
        case EDIT_LYRICS: {
            const newState = {
                allLyrics: {
                    ...state.allLyrics,
                    [action.payload.id]: action.payload
                }
            }
            return newState;
        }
        default:
            return state;
    }
}