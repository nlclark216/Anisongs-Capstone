import { csrfFetch } from "./csrf";

const LOAD_SONGS = 'songs/loadSongs';
const USER_SONGS = 'songs/userSongs';
const DELETE_SONG = 'songs/deleteSong';
const PLAYLIST_SONGS = 'songs/playlistSongs';
const CREATE_SONG = 'songs/createSong';
const UPDATE_SONG = 'songs/updateSong';
const ADD_LIKE = 'songs/addLike';
const REMOVE_LIKE = 'songs/removeLike';


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

const updateSong = payload => ({
    type: UPDATE_SONG,
    payload
})


export const thunkAllSongs = () => async dispatch => {
    const res = await fetch('/api/songs/');
    if(res.ok) {
        const data = await res.json();
        if (data.errors) {return;}
        dispatch(getSongs(data));
    } else if (res.status < 500) {
    const errorMessages = await res.json();
    return errorMessages
    } else {
    return { server: "Something went wrong. Please try again" }
    }  
}

export const thunkUserSongs = () => async dispatch => {
    const res = await fetch('/api/songs/current');
    if(res.ok) {
        const data = await res.json();
        if (data.errors) {return;}
        dispatch(userSongs(data));
    } else if (res.status < 500) {
    const errorMessages = await res.json();
    return errorMessages
    } else {
    return { server: "Something went wrong. Please try again" }
    }
}

export const thunkDeleteSong = (id, navigate) => async dispatch => {
    const res = await fetch(`/api/songs/${id}`, {method: 'DELETE'})
    if(res.ok) {
        dispatch(deleteSong(id));
        navigate('/songs/');
        window.location.reload();
    } else if (res.status < 500) {
    const errorMessages = await res.json();
    return errorMessages
    } else {
    return { server: "Something went wrong. Please try again" }
    }
}

export const thunkPlaylistSongs = id => async dispatch => {
    const res = await fetch(`/api/playlists/${id}/songs`);
    if(res.ok) {
        const data = await res.json();
        if (data.errors) {return;}
        dispatch(listSongs(data));
    } else if (res.status < 500) {
    const errorMessages = await res.json();
    return errorMessages
    } else {
    return { server: "Something went wrong. Please try again" }
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

export const thunkEditSong = (formData, id) => async dispatch => {
    const res = await fetch(`/api/songs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
    if(res.ok) {
    const updatedSong = await res.json();
    dispatch(updateSong(updatedSong));
    window.location.reload();
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
        case UPDATE_SONG: {
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