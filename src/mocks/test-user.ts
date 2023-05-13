import { User } from '../types/user';

export const users: User[] = [
  {
    id: 1,
    name: 'James',
    balance: 2000,
    operations: [
      {
        reason: 'Списание на WhatsApp рассылку (марафон №211042 от 2023-04-06)',
        date: '06.04.2023',
        write: 3050,
      },
      {
        reason: 'Списание на WhatsApp рассылку (марафон №211045 от 2023-04-08)',
        date: '09.04.2023',
        write: 2850,
      },
    ],
    cards: [
      {
        name: 'Банковская карта 1',
      },
      {
        name: 'Банковская карта 2',
      },
    ],
  },

  {
    id: 2,
    name: 'Kate',
    balance: 2500,
    operations: [
      {
        reason: 'Списание на WhatsApp рассылку (марафон №211040 от 2023-04-05)',
        date: '02.04.2023',
        write: 3050,
      },
      {
        reason: 'Списание на WhatsApp рассылку (марафон №211045 от 2023-04-08)',
        date: '09.04.2023',
        write: 2850,
      },
    ],
    cards: [
      {
        name: 'Банковская карта 1',
      },
      {
        name: 'Банковская карта 2э',
      },
    ],
  },
];
