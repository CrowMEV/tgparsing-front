import { Tariff, TariffResponse } from './../../types/tariff';
import { createAppAsyncThunk } from '../createAppAsyncThunk';
import { TariffRoutes } from './apiRoutes';
import { AxiosError } from 'axios';

export const getTariffs = createAppAsyncThunk<TariffResponse[], void>(
  'tariffs/getAll',
  async (_, { rejectWithValue, extra: api }) => {
    try {
      const { data } = await api.get(TariffRoutes.Tariffs);
      return data;
    } catch (error) {
      return rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

export const addTariff = createAppAsyncThunk<TariffResponse, Tariff>(
  'tariff/add',
  async (tariffData, { rejectWithValue, extra: api }) => {
    try {
      const { data } = await api.post<TariffResponse>(
        TariffRoutes.Tariffs,
        tariffData,
      );
      return data;
    } catch (error) {
      return rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

export const getTariff = createAppAsyncThunk<TariffResponse, number>(
  'tariff/getById',
  async (id, { rejectWithValue, extra: api }) => {
    try {
      const { data } = await api.get(`${TariffRoutes.Tariffs}${id}`);
      return data;
    } catch (error) {
      return rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

export const updateTariff = createAppAsyncThunk<TariffResponse, TariffResponse>(
  'tariff/update',
  async (tariffData, { rejectWithValue, extra: api }) => {
    try {
      const { data } = await api.patch<TariffResponse>(
        `${TariffRoutes.Tariffs}${tariffData.id}`,
        tariffData as Tariff,
      );
      return data;
    } catch (error) {
      return rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

export const deleteTariff = createAppAsyncThunk<number, number>(
  'tariff/delete',
  async (id, { rejectWithValue, extra: api }) => {
    try {
      await api.delete(`${TariffRoutes.Tariffs}${id}`);
      return id;
    } catch (error) {
      return rejectWithValue((error as AxiosError).response?.data);
    }
  },
);
