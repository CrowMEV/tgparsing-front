import { createBrowserRouter } from 'react-router-dom';
import { Routes } from './routes';
import Layout from '../components/layout/Layout';
import MainPage from '../pages/Home/MainPage';
import MailingPage from '../pages/Mailing/MailingPage';
import ParsersPage from '../pages/Parsers/ParsersPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegistrationPage from '../pages/RegistrationPage/RegistrationPage';
import BasePage from '../pages/BasePage/BasePage';
import FinancePage from '../pages/FinancePage/FinancePage';
import ReportPage from '../pages/ReportPage/ReportPage';
import InvitingPage from '../pages/InvitingPage/InvitingPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import DocumentsPage from '../pages/DocumentsPage/DocumentsPage';

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
      {
        path: Routes.Base,
        element: <BasePage />,
      },
      {
        path: Routes.Finance,
        element: <FinancePage />,
      },
      {
        path: Routes.Reports,
        element: <ReportPage />,
      },
      {
        path: Routes.Inviting,
        element: <InvitingPage />,
      },
      {
        path: Routes.Tariffs,
        element: <InvitingPage />,
      },
      {
        path: Routes.Profile,
        element: <ProfilePage />,
      },
      {
        path: Routes.Documents,
        element: <DocumentsPage />,
      },
    ],
  },
  {
    path: Routes.Login,
    element: <LoginPage />,
  },
  {
    path: Routes.Registration,
    element: <RegistrationPage />,
  },
  {
    path: '*',
    element: <div>404</div>,
  },
]);
