import { useAppSelector } from '../../hooks/redux';
import { Navigate } from 'react-router-dom';
import { Routes } from '../../router/routes';
import { AuthorizationStatus } from '../../consts/consts';
import Loader from '../ui/loader/loader';

type ProtectedRouteProps = {
  children: JSX.Element;
  isAuth?: boolean;
};

const ProtectedRoute = ({ children, isAuth = true }: ProtectedRouteProps) => {
  const authStatus = useAppSelector(
    (state) => state.UserData.authorizationStatus,
  );

  if (authStatus === AuthorizationStatus.Unknown) {
    return (
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
  } else if (isAuth && authStatus !== AuthorizationStatus.Auth) {
    return <Navigate to={Routes.Login} replace />;
  } else if (!isAuth && authStatus !== AuthorizationStatus.NoAuth) {
    //TODO Редирект на dashboard
    return <Navigate to={Routes.Home} replace />;
  }

  return children;
};

export default ProtectedRoute;