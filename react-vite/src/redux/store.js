import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import songsReducer from "./songs";
import playlistReducer from "./playlists";
import lyricsReducer from "./lyrics";
import likesReducer from "./likes";
import playlistSongsReducer from "./listSongs";

const rootReducer = combineReducers({
  session: sessionReducer,
  songs: songsReducer,
  playlists: playlistReducer,
  lyrics: lyricsReducer,
  likes: likesReducer,
  playlistSongs: playlistSongsReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
