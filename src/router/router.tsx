import { createBrowserRouter } from 'react-router-dom';
import { Routes } from './routes';
import Layout from '../components/layout/Layout';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';

import DashboardPage from '../pages/DashboardPage/DashboardPage';
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
import AuthLayout from '../components/AuthLayout/AuthLayout';
import StartPage from '../pages/StartPage/StartPage';
import RecoverPasswordPage from '../pages/RecoveryPasswordPage/RecoverPasswordPage';

export const router = createBrowserRouter([
  //TODO Убрать верхний path. Поменять Home на dashboard. Сделать отделный объект с path для Home.
  {
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: Routes.Dashboard,
        element: <DashboardPage />,
        index: true,
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
    element: (
      <ProtectedRoute isAuth={false}>
        <AuthLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: Routes.Login,
        element: <LoginPage />,
      },
      {
        path: Routes.Registration,
        element: <RegistrationPage />,
      },
    ],
  },
  {
    element: (
      <ProtectedRoute isAuth={false}>
        <AuthLayout isNavShown={false} />
      </ProtectedRoute>
    ),
    children: [
      {
        path: Routes.Recovery,
        element: <RecoverPasswordPage />,
      },
    ],
  },
  {
    path: '*',
    element: <div>404</div>,
  },
  {
    element: (
      <ProtectedRoute isAuth={false}>
        <StartPage />
      </ProtectedRoute>
    ),
    path: Routes.Home,
  },
]);
