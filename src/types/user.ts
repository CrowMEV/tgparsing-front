import { UserSubscribe } from './user-subscribe';

export interface Role {
  name: string;
  pretty_name: string;
  is_active: boolean;
}

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  timezone: number;
  is_staff: boolean;
  is_banned: boolean;
  is_verified: boolean;
  avatar_url: string;
  role: Role;
  phone_number: string;
  created_at: string;
  balance: number;
  subscribe: UserSubscribe | null;
}
