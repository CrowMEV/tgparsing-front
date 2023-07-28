import { TariffResponse } from '../types/tariff';
import { api } from './api';

export const fetchTariffs = async () => {
  const { data } = await api.get<TariffResponse[]>('/tariff/');
  return data;
};
