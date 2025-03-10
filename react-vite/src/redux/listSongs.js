import { csrfFetch } from "./csrf";

const LOAD_SONGS = 'playlistSongs/loadSongs';
const DELETE_SONG = 'playlistSongs/delete';
const ADD_SONG = 'playlistSongs/add';

const getListSongs = songs => ({
    type: LOAD_SONGS,
    payload: songs
})

const deleteSong = id => ({
    type: DELETE_SONG,
    payload: id
})

const addLike = id => ({
    type: ADD_SONG,
    payload: id
})

export const thunkAllPlaylistSongs = () => async dispatch => {
    const res = await csrfFetch('/api/playlist-songs/');
    if(res.ok) {
        const data = await res.json();
        if (data.errors) {return;}
        dispatch(getListSongs(data));
    } else if (res.status < 500) {
    const errorMessages = await res.json();
    return errorMessages
    } else {
    return { server: "Something went wrong. Please try again" }
    } 
}

export const thunkDeletePlaylistSong = (id) => async dispatch => {
    const res = await csrfFetch(`/api/playlist-songs/${id}`, {method: 'DELETE'})
    if(res.ok) {
        dispatch(deleteSong(id));
    } else if (res.status < 500) {
    const errorMessages = await res.json();
    return errorMessages
    } else {
    return { server: "Something went wrong. Please try again" }
    }
}

export const thunkAddPlaylistSong = (data, playlistId)=> async dispatch => {
    const res = await csrfFetch(`/api/playlists/${+playlistId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    if(res.ok) {
        const data = await res.json();
        dispatch(addLike(data));
    } else if (res.status < 500) {
    const errorMessages = await res.json();
    return errorMessages
    } else {
    return { server: "Something went wrong. Please try again" }
    }
}

const initialState = { allPlaylistSongs: {} }

export default function playlistSongsReducer(state=initialState, action) {
    switch(action.type) {
        case LOAD_SONGS: {
            const newState = { ...state, allPlaylistSongs: {}};
            const songsArr = action.payload.songs;
            songsArr.forEach(song=>{
                newState.allPlaylistSongs[song.id] = song;
            })
            return newState;
        }
        case DELETE_SONG: {
            const newState = {...state};
            delete newState.allPlaylistSongs[action.payload];
            return newState;
        }
        case ADD_SONG: {
            const newState = {
                allPlaylistSongs: {
                    ...state.allPlaylistSongs,
                    [action.payload.id]: action.payload
                }
            }
            return newState;
        }
        default:
            return state;
    }
}