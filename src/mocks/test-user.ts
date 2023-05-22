import { User } from '../types/user';

export const users: User[] = [
  {
    id: 1,
    firstName: 'James',
    lastName: 'Bond',
    avatar: 'https://multiavatar.com/06cde7712cf55ae47b',
    //TODO Убрать лишние моки
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
];
