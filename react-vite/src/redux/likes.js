const LOAD_LIKES = 'likes/loadLikes';
const ADD_LIKE = 'likes/addLike';
const REMOVE_LIKE = 'likes/removeLike';

const getLikes = (likes) => ({
    type: LOAD_LIKES,
    payload: likes
})

const addLike = id => ({
    type: ADD_LIKE,
    payload: id
})

export const thunkAddLike = (id, formData)=> async dispatch => {
    const res = await fetch(`/api/songs/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    });
    if(res.ok) {
        const data = await res.json();
        dispatch(addLike(data));
        window.location.reload();
    } else if (res.status < 500) {
    const errorMessages = await res.json();
    return errorMessages
    } else {
    return { server: "Something went wrong. Please try again" }
    }
}

export const thunkAllLikes = () => async dispatch => {
    const res = await fetch('/api/likes/');
    if(res.ok) {
        const data = await res.json();
        if (data.errors) {return;}
        dispatch(getLikes(data));
    } else if (res.status < 500) {
    const errorMessages = await res.json();
    return errorMessages
    } else {
    return { server: "Something went wrong. Please try again" }
    }
}

const initialState = { allLikes: {} }

export default function likesReducer(state=initialState, action) {
    switch(action.type) {
        case LOAD_LIKES: {
            const newState = { ...state, allLikes: {}};
            const likesArr = action.payload.likes;
            likesArr.forEach(like=>{
                newState.allLikes[like.id] = like;
            })
            return newState;
        }
        case ADD_LIKE: {
            const newState = {
                allLikes: {
                    ...state.allLikes,
                    [action.payload.id]: action.payload
                }
            }
            return newState;
        }
        default:
            return state;
    }
}