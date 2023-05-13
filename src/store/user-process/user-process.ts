import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { users } from '../../mocks/test-user';
import { fetchTestConnection } from '../api-actions';
import { User } from '../../types/user';

interface UserProcess {
  currentUser: User;
  testMessage: string;
}

const initialState: UserProcess = {
  currentUser: users[0],
  testMessage: '',
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    replenishBalance: (state, action: PayloadAction<number>) => {
      state.currentUser.balance = state.currentUser.balance + action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchTestConnection.fulfilled,
        (state, action: PayloadAction<{ message: string }>) => {
          state.testMessage = action.payload.message;
        },
      )
      .addCase(fetchTestConnection.rejected, (state) => {
        state.testMessage = 'connection error';
      });
  },
});

export const { replenishBalance } = userProcess.actions;
