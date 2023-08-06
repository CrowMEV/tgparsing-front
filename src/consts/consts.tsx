export enum AuthorizationStatus {
  Auth = 'Auth',
  NoAuth = 'NoAuth',
  Unknown = 'Unknown',
}

export const BASE_URL = 'https://api.tgparsing.ru';

export const TIMEZONES = [
  { value: 1, text: '(GMT +1) Амстердам, Рим, Берлин' },
  { value: 2, text: '(GMT +2) Киев' },
  { value: 3, text: '(GMT +3) Москва, Санкт-Петербург' },
  { value: 4, text: '(GMT +4) Самара, Саратов, Ереван' },
  { value: 5, text: '(GMT +5) Екатеринбург' },
  { value: 6, text: '(GMT +6) Омск' },
  { value: 7, text: '(GMT +7) Красноярск, Новосибирск' },
  { value: 8, text: '(GMT +8) Иркутск' },
  { value: 9, text: '(GMT +9) Якутск' },
  { value: 10, text: '(GMT +10) Владивосток' },
  { value: 11, text: '(GMT +11) Магадан' },
  { value: 12, text: '(GMT +12) Анадырь, Камчатка' },
];

export enum Modes {
  Admin = 'admin',
  User = 'user',
}

export enum Roles {
  Admin = 'admin',
  User = 'user',
  SuperUser = 'superuser',
}

export enum Parsers {
  Members = 'members',
  ActiveMembers = 'activemembers',
  GeoMembers = 'geomembers',
}
