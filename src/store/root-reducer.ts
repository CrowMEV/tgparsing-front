import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from './const';
import { userProcess } from './user-process/user-process';
import { userSlice } from './user-slice/userSlice';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.UserData]: userSlice.reducer,
});
