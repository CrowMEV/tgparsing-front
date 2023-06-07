import { ApiRoutes } from './apiRoutes';
import { LoginData, RegistrationRequestData } from '../../types/auth';
import { createAppAsyncThunk } from '../createAppAsyncThunk';
import { User } from '../../types/user';
import { AxiosError } from 'axios';

export const register = createAppAsyncThunk<User, RegistrationRequestData>(
  ApiRoutes.Register,
  async (registrationData, { rejectWithValue, extra: api }) => {
    try {
      const { data } = await api.post<User>(
        ApiRoutes.Register,
        registrationData,
      );
      return data;
    } catch (error) {
      return rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

export const login = createAppAsyncThunk<User, LoginData>(
  ApiRoutes.Login,
  async (loginData, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<User>(ApiRoutes.Login, loginData);
      return data;
    } catch (error) {
      return rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

export const logout = createAppAsyncThunk(
  ApiRoutes.Logout,
  async (_, { extra: api, rejectWithValue }) => {
    try {
      return await api.post(ApiRoutes.Logout);
    } catch (error) {
      return rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

export const refresh = createAppAsyncThunk<User, void>(
  ApiRoutes.Refresh,
  async (_, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.get<User>(ApiRoutes.Refresh);
      return data;
    } catch (error) {
      return rejectWithValue((error as AxiosError).response?.data);
    }
  },
);
