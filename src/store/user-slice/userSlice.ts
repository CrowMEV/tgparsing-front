import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, Modes } from '../../consts/consts';
import { User } from '../../types/user';
import { getAllUsers, login, logout, patchUser, refresh } from './apiActions';
import { setModeByRole } from '../../utils/setModeByRole';

type InitialState = {
  user: User | null;
  authorizationStatus: AuthorizationStatus;
  users: User[];
  mode: Modes | null;
};

const initialState: InitialState = {
  user: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  users: [],
  mode: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeMode: (state, action: PayloadAction<Modes>) => {
      state.mode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled.type, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.mode = setModeByRole(action.payload.role.name);
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(login.rejected.type, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logout.fulfilled.type, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.mode = null;
      })
      .addCase(refresh.fulfilled.type, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.mode = setModeByRole(action.payload.role.name);
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(refresh.rejected.type, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(
        patchUser.fulfilled.type,
        (state, action: PayloadAction<User>) => {
          state.user = action.payload;
        },
      )
      .addCase(
        getAllUsers.fulfilled.type,
        (state, action: PayloadAction<User[]>) => {
          state.users = action.payload;
        },
      )
      .addCase(getAllUsers.rejected.type, (state) => {
        state.users = [];
      });
  },
});

export const { changeMode } = userSlice.actions;
