import { createBrowserRouter, Navigate } from 'react-router-dom';
import LandingPage from '../components/LandingPage';
import DashboardPage from '../components/DashboardPage';
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
        path: 'dashboard',
        element: <DashboardPage />
      },
      {
				path: '*',
				element: <Navigate to='/' replace={true} />
			}
    ],
  },
]);