const REFRESH_TOKEN_KEY_NAME = 'tgparsing-refresh-token';

export type Token = string;

export const getToken = (): Token => {
  const token = localStorage.getItem(REFRESH_TOKEN_KEY_NAME);
  return token ?? '';
};

export const saveToken = (token: Token): void => {
  localStorage.setItem(REFRESH_TOKEN_KEY_NAME, token);
};

export const dropToken = (): void => {
  localStorage.removeItem(REFRESH_TOKEN_KEY_NAME);
};
