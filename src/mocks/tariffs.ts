import { Parsers } from '../consts/consts';
import { Tariff } from '../types/tariff';

export const tariffs: Tariff[] = [
  {
    name: 'Стандарт',
    description: '',
    limitation_days: 30,
    price: 99,
    options: {
      parsersPerDay: 5,
      simultaneousParsing: 1,
      methods: [Parsers.Members, Parsers.ActiveMembers, Parsers.GeoMembers],
    },
  },
];
