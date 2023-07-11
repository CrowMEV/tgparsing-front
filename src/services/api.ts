import axios from 'axios';
import type { AppStore } from '../store';
import { logout } from '../store/user-slice/apiActions';
import { ApiRoutes } from '../store/user-slice/apiRoutes';
import { BASE_URL } from '../consts/consts';

const REQUEST_TIME = 5000;
let store: AppStore;

export const injectStore = (_store: AppStore) => (store = _store);

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: REQUEST_TIME,
  withCredentials: true,
});

api.interceptors.response.use(
  (config) => config,
  async (error) => {
    if (
      error.response.status === 401 &&
      error.config.url !== ApiRoutes.Refresh &&
      error.config.url !== ApiRoutes.Logout
    ) {
      store.dispatch(logout());
    }
    throw error;
  },
);
