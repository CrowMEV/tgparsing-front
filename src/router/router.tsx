import { createBrowserRouter } from 'react-router-dom';
import { Routes } from './routes';
import Layout from '../components/layout/Layout';
import MainPage from '../pages/Home/MainPage';
import MailingPage from '../pages/Mailing/MailingPage';
import ParsersPage from '../pages/Parsers/ParsersPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegistrationPage from '../pages/RegistrationPage/RegistrationPage';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';

export const router = createBrowserRouter([
  //TODO Убрать верхний path. Поменять Home на dashboard. Сделать отделный объект с path для Home.
  {
    path: Routes.Home,
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: Routes.Home,
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
    element: (
      <ProtectedRoute isAuth={false}>
        <LoginPage />
      </ProtectedRoute>
    ),
  },
  {
    path: Routes.Registration,
    element: (
      <ProtectedRoute isAuth={false}>
        <RegistrationPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <div>404</div>,
  },
]);
