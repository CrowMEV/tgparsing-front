export interface LoginData {
  email: string;
  password: string;
}

export interface RegistrationData {
  firstName: string;
  email: string;
  telegramId: string;
  password: string;
  passwordCheck?: string;
}
