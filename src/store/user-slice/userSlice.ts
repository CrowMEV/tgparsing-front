import {
  PayloadAction,
  createSlice,
  isPending,
  isFulfilled,
} from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../consts/consts';
import { User } from '../../types/user';
import { login, logout } from './apiActions';
import { Status } from '../const';

type InitialState = {
  user: User | null;
  authorizationStatus: AuthorizationStatus;
  status: Status;
};

const initialState: InitialState = {
  user: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  status: Status.Uninitialized,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled.type, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(login.rejected.type, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logout.fulfilled.type, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      // .addCase(
      //   refresh.fulfilled.type,
      //   (state, action: PayloadAction<RefreshResponse>) => {
      //     state.accessToken = action.payload.access;
      //     state.authorizationStatus = AuthorizationStatus.Auth;
      //   },
      // )
      // .addCase(refresh.rejected.type, (state) => {
      //   state.accessToken = null;
      // })
      // .addCase(getUser.fulfilled.type, (state, action: PayloadAction<User>) => {
      //   state.user = action.payload;
      // })
      .addMatcher(isPending, (state) => {
        state.status = Status.Pending;
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = Status.Fulfilled;
      });
  },
});
