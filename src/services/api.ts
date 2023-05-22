import axios from 'axios';
import type { AppStore } from '../store';
import { refresh } from '../store/user-slice/apiActions';
import { ApiRoutes } from '../store/user-slice/apiRoutes';

export const BASE_URL = 'http://62.113.102.145/api';
const REQUEST_TIME = 5000;
let store: AppStore;

export const injectStore = (_store: AppStore) => (store = _store);

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: REQUEST_TIME,
});

api.interceptors.request.use((config) => {
  const token = store.getState().UserData.accessToken;

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest.url !== ApiRoutes.Refresh &&
      !originalRequest._isReplica
    ) {
      originalRequest._isReplica = true;
      await store.dispatch(refresh());
      return api.request(originalRequest);
    }
    throw error;
  },
);
