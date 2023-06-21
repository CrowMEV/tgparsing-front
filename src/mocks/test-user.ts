import { User } from '../types/user';

export const users: User[] = [
  {
    id: 1,
    firstname: 'James',
    lastname: 'Bond',
    avatar_url: 'https://multiavatar.com/06cde7712cf55ae47b',
    email: '',
    is_active: true,
    is_superuser: false,
    is_verified: true,
    role: {
      name: 'user',
      is_active: true,
      permissions: {},
    },
  },
];
