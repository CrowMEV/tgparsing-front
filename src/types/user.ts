//TODO Перечисление ролей
interface Role {
  name: string;
  is_active: boolean;
  permissions: object;
}

export interface User {
  id: number;
  avatar_url: string;
  firstname: string;
  lastname: string;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;
  role: Role;
  timezone: number;
  created_at: string;
  phone_number: string;
}
