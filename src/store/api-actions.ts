import { AppDispatch, State } from './index';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

export const fetchTestConnection = createAsyncThunk<
  { message: string },
  undefined,
  {
    extra: AxiosInstance;
    state: State;
    dispatch: AppDispatch;
  }
>('test/connection', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<{ message: string }>('/connection-test/');
  return data;
});
