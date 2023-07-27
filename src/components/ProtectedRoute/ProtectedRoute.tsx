import { useAppSelector } from '../../hooks/redux';
import { Navigate, useLocation } from 'react-router-dom';
import { Routes } from '../../router/routes';
import { AuthorizationStatus, Modes, Roles } from '../../consts/consts';
import Loader from '../ui/loader/loader';

type ProtectedRouteProps = {
  children: JSX.Element;
  authProtection?: boolean;
};

const ProtectedRoute = ({
  children,
  authProtection = true,
}: ProtectedRouteProps) => {
  const authStatus = useAppSelector(
    (state) => state.UserData.authorizationStatus,
  );

  const roleAdminProtection =
    useAppSelector((state) => state.UserData.user?.role.name) === Roles.Admin;
  const mode = useAppSelector((state) => state.UserData.mode);

  const currentLocation = useLocation();

  if (authStatus === AuthorizationStatus.Unknown) {
    return (
      //TODO loader page
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Loader width={50} height={50} />
      </div>
    );
  } else if (
    currentLocation.pathname === Routes.Tariffs &&
    authProtection &&
    authStatus !== AuthorizationStatus.Auth
  ) {
    return <Navigate to={Routes.HomeTariffs} replace />;
  } else if (authProtection && authStatus !== AuthorizationStatus.Auth) {
    return <Navigate to={Routes.Login} replace />;
  } else if (!authProtection && authStatus !== AuthorizationStatus.NoAuth) {
    return <Navigate to={Routes.Dashboard} replace />;
  } else if (authStatus === AuthorizationStatus.Auth) {
    if (
      (!roleAdminProtection || mode === Modes.User) &&
      currentLocation.pathname.split('/')[1] === 'admin'
    ) {
      return <Navigate to={Routes.Dashboard} replace />;
    } else if (
      mode === Modes.Admin &&
      currentLocation.pathname.split('/')[1] !== 'admin'
    ) {
      return <Navigate to={Routes.AdminUsers} replace />;
    }
  }
  return children;
};

export default ProtectedRoute;
