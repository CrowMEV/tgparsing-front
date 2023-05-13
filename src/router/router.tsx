import { createBrowserRouter } from 'react-router-dom';
import { Routes } from './routes';
import Layout from '../components/layout/Layout';
import MainPage from '../pages/Home/MainPage';
import MailingPage from '../pages/Mailing/MailingPage';
import ParsersPage from '../pages/Parsers/ParsersPage';

export const router = createBrowserRouter([
  {
    path: Routes.Home,
    element: <Layout />,
    errorElement: <div>error</div>,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: Routes.Mailing,
        element: <MailingPage />,
      },
      {
        path: Routes.Parsers,
        element: <ParsersPage />,
      },
    ],
  },
  {
    path: '*',
    element: <div>404</div>,
  },
]);
