import { createBrowserRouter } from 'react-router-dom';
import { Routes } from './routes';
import Layout from '../components/layout/Layout';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';

import DashboardPage from '../pages/DashboardPage/DashboardPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegistrationPage from '../pages/RegistrationPage/RegistrationPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import DocumentsPage from '../pages/DocumentsPage/DocumentsPage';
import AuthLayout from '../components/AuthLayout/AuthLayout';
import StartPage from '../pages/StartPage/StartPage';
import RecoverPasswordPage from '../pages/RecoveryPasswordPage/RecoverPasswordPage';
import ParsersLayout from '../components/parsers/ParsersLayout/ParsersLayout';
import Activities from '../components/parsers/activities/Activities';
import Participants from '../components/parsers/participants/Participants';
import Geolocation from '../components/parsers/geolocation/Geolocation';
import TariffsPage from '../pages/TariffsPage/TariffsPage';
import StartLayout from '../components/StartLayout/StartLayout';
import TariffAdminPage from '../pages/Admin/TariffPage/TariffAdminPage';
import UsersAdminPage from '../pages/Admin/UsersPage/UsersAdminPage';
import BotsAdminPage from '../pages/Admin/BotsPage/BotsAdminPage';
import FinanceAdminPage from '../pages/Admin/FinancePage/FinanceAdminPage';
import UserPage from '../pages/Admin/UserPage/UserPage';
import AdminProfilePage from '../pages/Admin/AdminProfilePage/AdminProfilePage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';

export const router = createBrowserRouter([
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
        path: Routes.Parsers,
        element: <ParsersLayout />,
        children: [
          {
            path: Routes.ParsersActivities,
            element: <Activities />,
          },
          {
            path: Routes.ParsersParticipants,
            element: <Participants />,
          },
          {
            path: Routes.ParsersGeolocation,
            element: <Geolocation />,
          },
        ],
      },
      {
        path: Routes.Tariffs,
        element: <TariffsPage />,
      },
      {
        path: Routes.Profile,
        element: <ProfilePage />,
      },
    ],
  },
  {
    element: (
      <ProtectedRoute authRequired={false}>
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
      <ProtectedRoute authRequired={false}>
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
    element: <NotFoundPage />,
  },
  {
    element: (
      <ProtectedRoute authRequired={false}>
        <StartLayout />
      </ProtectedRoute>
    ),
    path: Routes.Home,
    children: [
      {
        index: true,
        element: <StartPage />,
      },
      {
        path: Routes.HomeTariffs,
        element: <TariffsPage />,
      },
    ],
  },
  {
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: Routes.AdminUsers,
        element: <UsersAdminPage />,
        index: true,
      },
      {
        path: Routes.AdminUser,
        element: <UserPage />,
      },
      {
        path: Routes.AdminTariff,
        element: <TariffAdminPage />,
      },
      {
        path: Routes.AdminBots,
        element: <BotsAdminPage />,
      },
      {
        path: Routes.AdminFinance,
        element: <FinanceAdminPage />,
      },
      {
        path: Routes.AdminProfile,
        element: <AdminProfilePage />,
      },
      {
        path: Routes.AdminDocuments,
        element: <DocumentsPage />,
      },
    ],
  },
]);
