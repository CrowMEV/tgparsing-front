export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
}

export interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordCheck?: string;
}

export type RegistrationRequestData = Omit<RegistrationData, 'passwordCheck'>;

//TODO user type
export interface RegistrationResponse {
  email: string;
  username: string;
  id: number;
}

export interface RefreshResponse {
  access: string;
}
