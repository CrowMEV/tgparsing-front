import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, Modes } from '../../consts/consts';
import { User } from '../../types/user';
import { login, logout, patchUser, refresh } from './apiActions';
import { setModeByRole } from '../../utils/setModeByRole';
import {
  getModeFromLocalStorage,
  saveModeToLocalStorage,
} from '../../services/local-storage';

type InitialState = {
  user: User | null;
  authorizationStatus: AuthorizationStatus;
  mode: Modes | null;
};

const initialState: InitialState = {
  user: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  mode: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeMode: (state, action: PayloadAction<Modes>) => {
      saveModeToLocalStorage(action.payload);
      state.mode = action.payload;
    },
    editUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    localLogout: (state) => {
      state.user = null;
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled.type, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        if (action.payload.role.name === Modes.User) {
          saveModeToLocalStorage(Modes.User);
        }
        state.mode =
          getModeFromLocalStorage() ?? setModeByRole(action.payload.role.name);
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(login.rejected.type, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logout.fulfilled.type, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = null;
        state.mode = null;
      })
      .addCase(refresh.fulfilled.type, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.mode =
          getModeFromLocalStorage() ?? setModeByRole(action.payload.role.name);
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
      );
  },
});

export const { changeMode, editUser, localLogout } = userSlice.actions;
