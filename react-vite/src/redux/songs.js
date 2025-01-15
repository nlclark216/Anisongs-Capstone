const LOAD_SONGS = 'songs/loadSongs';
const USER_SONGS = 'songs/userSongs';
const DELETE_SONG = 'songs/deleteSong';


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

export const thunkDeleteSong = (id) => async dispatch =>{
    const res = await fetch(`/api/songs/${id}`, {method: 'DELETE'})
    if(res.ok) {
        dispatch(deleteSong(id));
        window.location.reload();
    }
}

const initialState = { allSongs: {}, userSongs: {} }

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
        default: 
            return state;
    }
}