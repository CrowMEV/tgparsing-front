import { createBrowserRouter } from 'react-router-dom';
import { Routes } from './routes';
import Layout from '../components/layout/Layout';
import MainPage from '../pages/Home/MainPage';
import MailingPage from '../pages/Mailing/MailingPage';
import ParsersPage from '../pages/Parsers/ParsersPage';
import Login from '../pages/Login/Login';
import Registration from '../pages/Registration/Registration';

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
    path: Routes.Login,
    element: <Login />,
  },
  {
    path: Routes.Registration,
    element: <Registration />,
  },
  {
    path: '*',
    element: <div>404</div>,
  },
]);
