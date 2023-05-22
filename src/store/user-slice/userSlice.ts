import {
  PayloadAction,
  createSlice,
  isPending,
  isFulfilled,
} from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../consts/consts';
import { User } from '../../types/user';
import { LoginResponse, RefreshResponse } from '../../types/auth';
import { getUser, login, refresh } from './apiActions';
import { saveToken } from '../../services/refreshToken';
import { Status } from '../const';

type InitialState = {
  user: User | null;
  authorizationStatus: AuthorizationStatus;
  accessToken: string | null;
  status: Status;
};

const initialState: InitialState = {
  user: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  accessToken: null,
  status: Status.Uninitialized,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    accessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        login.fulfilled.type,
        (state, action: PayloadAction<LoginResponse>) => {
          const { access, refresh } = action.payload;
          state.accessToken = access;
          state.authorizationStatus = AuthorizationStatus.Auth;
          saveToken(refresh);
        },
      )
      .addCase(login.rejected.type, (state) => {
        state.accessToken = null;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(
        refresh.fulfilled.type,
        (state, action: PayloadAction<RefreshResponse>) => {
          state.accessToken = action.payload.access;
          state.authorizationStatus = AuthorizationStatus.Auth;
        },
      )
      .addCase(refresh.rejected.type, (state) => {
        state.accessToken = null;
      })
      .addCase(getUser.fulfilled.type, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      })
      .addMatcher(isPending, (state) => {
        state.status = Status.Pending;
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = Status.Fulfilled;
      });
  },
});

export const { accessToken } = userSlice.actions;
