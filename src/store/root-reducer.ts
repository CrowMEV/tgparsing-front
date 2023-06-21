import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from './const';
import { userSlice } from './user-slice/userSlice';

export const rootReducer = combineReducers({
  [NameSpace.UserData]: userSlice.reducer,
});
