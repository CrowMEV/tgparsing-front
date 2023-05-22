import { useNavigate } from 'react-router-dom';
import { getUser, login } from '../store/user-slice/apiActions';
import { LoginData } from '../types/auth';
import { useAppDispatch, useAppSelector } from './redux';
import { Routes } from '../router/routes';

export const useFetchBaseUserInfo = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.UserData.user);
  const status = useAppSelector((state) => state.UserData.status);

  const fetch = async (loginData: LoginData) => {
    try {
      await dispatch(login(loginData)).unwrap();
      const userPromise = dispatch(getUser()).unwrap();
      const [user] = await Promise.all([userPromise]);
      console.log(user);
      navigate(Routes.Home);
    } catch (error) {
      console.error(error);
    }
  };
  return { fetch, user, status };
};
