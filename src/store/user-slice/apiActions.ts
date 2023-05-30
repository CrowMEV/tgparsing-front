import { ApiRoutes } from './apiRoutes';
import { LoginData, RegistrationRequestData } from '../../types/auth';
import { createAppAsyncThunk } from '../createAppAsyncThunk';
import { User } from '../../types/user';

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
      return rejectWithValue(null);
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
      return rejectWithValue(null);
    }
  },
);

export const logout = createAppAsyncThunk(
  ApiRoutes.Logout,
  async (_, { extra: api, rejectWithValue }) => {
    try {
      return await api.post(ApiRoutes.Logout);
    } catch (error) {
      return rejectWithValue(null);
    }
  },
);

// export const refresh = createAppAsyncThunk<RefreshResponse, void>(
//   ApiRoutes.Refresh,
//   async (_, { extra: api, rejectWithValue }) => {
//     try {
//       const refreshToken = getToken();

//       if (!refreshToken) {
//         return rejectWithValue(null);
//       }
//       const { data } = await api.post<LoginResponse>(ApiRoutes.Refresh, {
//         refresh: refreshToken,
//       });
//       return data;
//     } catch (error) {
//       return rejectWithValue(null);
//     }
//   },
// );

// export const getUser = createAppAsyncThunk<User, void>(
//   ApiRoutes.GetUser,
//   async (_, { extra: api, rejectWithValue }) => {
//     try {
//       // const userDataPromise = api.get(ApiRoutes.GetUser);
//       // const balanceDataPromise = api.get(ApiRoutes.GetUser);
//       // const [user, balance] = await Promise.all([
//       //   userDataPromise,
//       //   balanceDataPromise,
//       // ]);
//       const { data } = await api.get<User>(ApiRoutes.GetUser);

//       return data;
//       // return {user, balance};
//     } catch (error) {
//       return rejectWithValue(null);
//     }
//   },
// );
