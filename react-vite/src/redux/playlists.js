const LOAD_PLAYLISTS = 'playlists/loadPlaylists';
const USER_PLAYLISTS = 'playlists/userPlaylists';

const getPlaylists = playlists => ({
    type: LOAD_PLAYLISTS,
    payload: playlists
})

const userPlaylists = playlists => ({
    type: USER_PLAYLISTS,
    payload: playlists
})

export const thunkAllPlaylists = () => async dispatch => {
    const res = await fetch('/api/playlists/');
    if(res.ok) {
        const data = await res.json();
        if (data.errors) {return;}
        dispatch(getPlaylists(data));
    }
}

export const thunkUserPlaylists = () => async dispatch => {
    const res = await fetch('/api/playlists/current');
    if(res.ok) {
        const data = await res.json();
        if (data.errors) {return;}
        dispatch(userPlaylists(data));
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
        default:
            return state;
    }
}