import { createBrowserRouter, Navigate } from 'react-router-dom';
import LandingPage from '../components/LandingPage';
import SongsComponent from '../components/SongsComponent';
import PlaylistsComponent from '../components/PlaylistsComponent/PlaylistsComponent';
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
				path: '*',
				element: <Navigate to='/' replace={true} />
			}
    ],
  },
]);