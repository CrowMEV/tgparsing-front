export interface LoginData {
  email: string;
  password: string;
}

export interface RegistrationData {
  email: string;
  password: string;
  passwordCheck?: string;
}

export type RegistrationRequestData = {
  email: string;
  password: string;
  timezone: number;
};

export type RegistrationResponseData = {
  detail: string;
};
