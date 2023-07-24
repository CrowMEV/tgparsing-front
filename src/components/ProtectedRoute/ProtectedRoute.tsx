import { useAppSelector } from '../../hooks/redux';
import { Navigate, useLocation } from 'react-router-dom';
import { Routes } from '../../router/routes';
import { AuthorizationStatus, Modes, Roles } from '../../consts/consts';
import Loader from '../ui/loader/loader';

type ProtectedRouteProps = {
  children: JSX.Element;
  isAuth?: boolean;
};

const ProtectedRoute = ({ children, isAuth = true }: ProtectedRouteProps) => {
  const authStatus = useAppSelector(
    (state) => state.UserData.authorizationStatus,
  );

  const role = useAppSelector((state) => state.UserData.user?.role.name);
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
    isAuth &&
    authStatus !== AuthorizationStatus.Auth
  ) {
    return <Navigate to={Routes.HomeTariffs} replace />;
  } else if (isAuth && authStatus !== AuthorizationStatus.Auth) {
    return <Navigate to={Routes.Login} replace />;
  } else if (!isAuth && authStatus !== AuthorizationStatus.NoAuth) {
    return <Navigate to={Routes.Dashboard} replace />;
  } else if (
    role !== Roles.Admin &&
    currentLocation.pathname.split('/')[1] === 'admin'
  ) {
    return <Navigate to={Routes.Dashboard} replace />;
  } else if (
    isAuth &&
    mode === Modes.Admin &&
    currentLocation.pathname.split('/')[1] !== 'admin' &&
    currentLocation.pathname.split('/')[1] !== 'profile' &&
    currentLocation.pathname.split('/')[1] !== 'documents'
  ) {
    return <Navigate to={Routes.AdminUsers} replace />;
  }

  return children;
};

export default ProtectedRoute;
