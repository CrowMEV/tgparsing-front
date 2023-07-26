import { Parsers } from '../consts/consts';

export interface Tariff {
  name: string;
  description: string;
  limitation_days: number;
  price: number;
  options: {
    parsersPerDay: number;
    simultaneousParsing: number;
    methods: Parsers[];
  };
}

export interface TariffResponse extends Tariff {
  id: number;
}

export interface TariffForm {
  name: string;
  description: string;
  limitation_days: number | '';
  price: number | '';
  options: {
    parsersPerDay: number | '';
    simultaneousParsing: number | '';
    methods: Parsers[];
  };
}
