import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
import { api, injectStore } from '../services/api';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
  devTools: process.env.NODE_ENV === 'development',
});
injectStore(store);

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
