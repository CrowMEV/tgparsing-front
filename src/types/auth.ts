export interface LoginData {
  email: string;
  password: string;
}

export interface RegistrationData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  passwordCheck?: string;
}

export type RegistrationRequestData = Omit<RegistrationData, 'passwordCheck'>;
