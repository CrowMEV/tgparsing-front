import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from './const';
import { userSlice } from './user-slice/userSlice';
import { tariffSlice } from './tariff-slice/tariffSlice';

export const rootReducer = combineReducers({
  [NameSpace.UserData]: userSlice.reducer,
  [NameSpace.Tariff]: tariffSlice.reducer,
});
