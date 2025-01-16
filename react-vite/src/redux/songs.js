import { csrfFetch } from "./csrf";

const LOAD_SONGS = 'songs/loadSongs';
const USER_SONGS = 'songs/userSongs';
const DELETE_SONG = 'songs/deleteSong';
const PLAYLIST_SONGS = 'songs/playlistSongs';
const CREATE_SONG = 'songs/createSong';


const getSongs = (songs) => ({
    type: LOAD_SONGS,
    payload: songs
})

const userSongs = (songs) => ({
    type: USER_SONGS,
    payload: songs
})

const deleteSong = id => ({
    type: DELETE_SONG,
    payload: id
})

const listSongs = payload => ({
    type: PLAYLIST_SONGS,
    payload
})

const createSong = payload => ({
    type: CREATE_SONG,
    payload
})

export const thunkAllSongs = () => async dispatch => {
    const res = await fetch('/api/songs/');
    if(res.ok) {
        const data = await res.json();
        if (data.errors) {return;}
        dispatch(getSongs(data));
    }   
}

export const thunkUserSongs = () => async dispatch => {
    const res = await fetch('/api/songs/current');
    if(res.ok) {
        const data = await res.json();
        if (data.errors) {return;}
        dispatch(userSongs(data));
    }   
}

export const thunkDeleteSong = (id) => async dispatch => {
    const res = await fetch(`/api/songs/${id}`, {method: 'DELETE'})
    if(res.ok) {
        dispatch(deleteSong(id));
        window.location.reload();
    }
}

export const thunkPlaylistSongs = id => async dispatch => {
    const res = await fetch(`/api/playlists/${id}/songs`);
    if(res.ok) {
        const data = await res.json();
        if (data.errors) {return;}
        dispatch(listSongs(data));
    } 
}

export const thunkCreateSong = (formData) => async dispatch => {
    const res = await csrfFetch('/api/songs/', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    })

    if(res.ok) {
        const data = await res.json();
        dispatch(createSong(data))
    } else if (res.status < 500) {
    const errorMessages = await res.json();
    return errorMessages
    } else {
    return { server: "Something went wrong. Please try again" }
    }
}

const initialState = { allSongs: {}, userSongs: {}, playlistSongs: {} }

export default function songsReducer(state = initialState, action) {
    switch(action.type) {
        case LOAD_SONGS: {
            const newState = { ...state, allSongs: {}};
            const songsArr = action.payload.songs;
            songsArr.forEach(song=>{
                newState.allSongs[song.id] = song;
            })
            return newState;
        }
        case USER_SONGS: {
            const newState = { ...state, userSongs: {}};
            const songsArr = action.payload.songs;
            songsArr.forEach(song=>{
                newState.userSongs[song.id] = song;
            })
            return newState;
        }
        case DELETE_SONG: {
            const newState = {...state};
            delete newState.allSongs[action.payload];
            return newState;
        }
        case PLAYLIST_SONGS: {
            const newState = { ...state, playlistSongs: {}};
            const songsArr = action.payload;
            songsArr.map(song=>{
                newState.playlistSongs[song.id] = song;
            })
            return newState;
        }
        case CREATE_SONG: {
            const newState = {
                allSongs: {
                    ...state.allSongs,
                    [action.payload.id]: action.payload
                }
            }
            return newState;
        }
        default: 
            return state;
    }
}