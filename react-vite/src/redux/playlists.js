import { csrfFetch } from "./csrf";

const LOAD_PLAYLISTS = 'playlists/loadPlaylists';
const USER_PLAYLISTS = 'playlists/userPlaylists';
const DELETE_PLAYLIST = 'playlists/deletePlaylist';
const CREATE_PLAYLIST = 'playlists/creatPlaylist';
const UPDATE_PLAYLIST = 'playlists/updatePlaylist';

const getPlaylists = playlists => ({
    type: LOAD_PLAYLISTS,
    payload: playlists
})

const userPlaylists = playlists => ({
    type: USER_PLAYLISTS,
    payload: playlists
})

const deletePlaylist = id => ({
    type: DELETE_PLAYLIST,
    payload: id
})

const createList = payload => ({
    type: CREATE_PLAYLIST,
    payload
})

const editList = payload => ({
    type: UPDATE_PLAYLIST,
    payload
})

export const thunkAllPlaylists = () => async dispatch => {
    const res = await fetch('/api/playlists/');
    if(res.ok) {
        const data = await res.json();
        if (data.errors) {return;}
        dispatch(getPlaylists(data));
    } else if (res.status < 500) {
    const errorMessages = await res.json();
    return errorMessages
    } else {
    return { server: "Something went wrong. Please try again" }
    }
}

export const thunkUserPlaylists = () => async dispatch => {
    const res = await fetch('/api/playlists/current');
    if(res.ok) {
        const data = await res.json();
        if (data.errors) {return;}
        dispatch(userPlaylists(data));
    } else if (res.status < 500) {
    const errorMessages = await res.json();
    return errorMessages
    } else {
    return { server: "Something went wrong. Please try again" }
    }
}

export const thunkDeletePlaylist = (id, navigate) => async dispatch => {
    const res = await fetch(`/api/playlists/${+id}`, {method: 'DELETE'});
    if(res.ok) {
        dispatch(deletePlaylist(+id));
        navigate('/playlists/');
        window.location.reload();
    } else if (res.status < 500) {
    const errorMessages = await res.json();
    return errorMessages
    } else {
    return { server: "Something went wrong. Please try again" }
    }
}

export const thunkCreatePlaylist = (formData) => async dispatch => {
    const res = await csrfFetch('api/playlists/', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    })

    if(res.ok) {
        const data = await res.json();
        dispatch(createList(data))
        // .then(window.location.reload());
    } else if (res.status < 500) {
    const errorMessages = await res.json();
    return errorMessages
    } else {
    return { server: "Something went wrong. Please try again" }
    }
}

export const thunkEditPlaylist = (formData, id) => async dispatch => {
    const res = await fetch(`/api/playlists/${+id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    });
    if(res.ok) {
    const updatedPlaylist = await res.json();
    dispatch(editList(updatedPlaylist));
    window.location.reload()
    } else if (res.status < 500) {
    const errorMessages = await res.json();
    return errorMessages
    } else {
    return { server: "Something went wrong. Please try again" }
    }
}

const initialState = { allPlaylists: {}, userPlaylists: {} }

export default function playlistReducer(state = initialState, action) {
    switch(action.type) {
        case LOAD_PLAYLISTS: {
            const newState = { ...state, allPlaylists: {}};
            const listArr = action.payload.playlists;
            listArr.forEach(list=>{
                newState.allPlaylists[list.id] = list
            })
            return newState;
        }
        case USER_PLAYLISTS: {
            const newState = { ...state, userPlaylists: {}};
            const listArr = action.payload.playlists;
            listArr.forEach(list=>{
                newState.userPlaylists[list.id] = list
            })
            return newState;
        }
        case DELETE_PLAYLIST: {
            const newState = {...state};
            delete newState.allPlaylists[action.payload];
            return newState;
        }
        case CREATE_PLAYLIST: {
            const newState = {
                allPlaylists: {
                    ...state.allPlaylists,
                    [action.payload.id]: action.payload
                }
            }
            return newState;
        }
        case UPDATE_PLAYLIST: {
            const newState = {
                allPlaylists: {
                    ...state.allPlaylists,
                    [action.payload.id]: action.payload
                }
            }
            return newState;
        }
        default:
            return state;
    }
}