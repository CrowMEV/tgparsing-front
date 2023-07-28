import { User } from '../types/user';
import { api } from './api';

export const fetchUsers = async () => {
  const { data } = await api.get<User[]>('/user/');
  return data;
};
