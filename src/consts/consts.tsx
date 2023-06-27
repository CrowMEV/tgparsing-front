export enum AuthorizationStatus {
  Auth = 'Auth',
  NoAuth = 'NoAuth',
  Unknown = 'Unknown',
}

export enum ParserNames {
  Geolocation = 'Geolocation',
  Activities = 'Activities',
  Participants = 'Participants',
}

export const PASS_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]|.*[_]).{8,}/;

export const NAME_REGEX = /^([А-Я]{0,1}[а-яё]+|[A-Z]{0,1}[a-z]+)$/;
