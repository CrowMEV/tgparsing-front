import axios from 'axios';

export const BASE_URL = 'https://api.tgparsing.ru';
const REQUEST_TIME = 5000;

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: REQUEST_TIME,
  withCredentials: true,
});
