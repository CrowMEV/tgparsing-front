import { State } from './../index';
import { NameSpace } from '../const';

export const getCurrentUser = (state: State) =>
  state[NameSpace.User].currentUser;

export const getTestMessage = (state: State) =>
  state[NameSpace.User].testMessage;
