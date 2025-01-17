import { createBrowserRouter, Navigate } from 'react-router-dom';
import LandingPage from '../components/LandingPage';
import SongsComponent from '../components/SongsComponent';
import PlaylistsComponent from '../components/PlaylistsComponent/PlaylistsComponent';
import SinglePlaylist from '../components/SinglePlaylist';
import SingleSong from '../components/SingleSong';
import CreateSongForm from '../components/CreateSongForm/CreateSongForm';
import CreatePlaylistForm from '../components/CreatePlaylistForm/CreatePlaylistForm';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: 'playlists',
        element: <PlaylistsComponent />
      },
      {
        path: 'songs',
        element: <SongsComponent />
      },
      {
        path: 'songs/create',
        element: <CreateSongForm />
      },
      {
        path: 'songs/:songId',
        element: <SingleSong />
      },
      {
        path: 'playlists/:playlistId',
        element: <SinglePlaylist />
      },
      {
        path: 'playlists/create',
        element: <CreatePlaylistForm />
      },
      {
				path: '*',
				element: <Navigate to='/' replace={true} />
			}
    ],
  },
]);