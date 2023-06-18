import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../consts/consts';
import { User } from '../../types/user';
import { login, logout, refresh } from './apiActions';

type InitialState = {
  user: User | null;
  authorizationStatus: AuthorizationStatus;
};

const initialState: InitialState = {
  user: null,
  authorizationStatus: AuthorizationStatus.Unknown,
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
      .addCase(refresh.fulfilled.type, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(refresh.rejected.type, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  },
});
