//TODO Перечисление ролей
interface Role {
  name: string;
  is_active: boolean;
  staff_action: [];
  payment_action: string[];
  role_action: [];
}

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  timezone: number;
  is_staff: boolean;
  is_active: boolean;
  is_verified: boolean;
  avatar_url: string;
  role: Role;
  phone_number: string;
  created_at: string;
  balance: number;
}
