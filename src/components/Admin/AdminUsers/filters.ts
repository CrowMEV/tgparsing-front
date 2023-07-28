export type UsersFilter = {
  name: string;
  title: string;
  value: string;
  isActive: boolean;
};

export const initialUsersFilter: UsersFilter[] = [
  {
    name: 'email',
    title: 'Email',
    value: '',
    isActive: false,
  },

  {
    name: 'surname',
    title: 'Фамилия',
    value: '',
    isActive: false,
  },

  {
    name: 'name',
    title: 'Имя',
    value: '',
    isActive: false,
  },

  {
    name: 'registrationDate',
    title: 'Дата регистрации',
    value: '',
    isActive: false,
  },

  {
    name: 'phone',
    title: 'Телефон',
    value: '',
    isActive: false,
  },
];
