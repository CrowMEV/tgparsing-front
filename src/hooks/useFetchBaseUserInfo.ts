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

  //TODO const fetch = async (loginData: LoginData) => {
  const fetch = async (loginData: any) => {
    try {
      await dispatch(login(loginData)).unwrap();
      const user = await dispatch(getUser()).unwrap();
      console.log(user);
      navigate(Routes.Home);
    } catch (error) {
      console.error(error);
    }
  };
  return { fetch, user, status };
};
