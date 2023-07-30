export interface Options {
  parsers_per_day: number;
  simultaneous_parsing: number;
  geo: boolean;
  members: boolean;
  activity: boolean;
}

export interface Tariff {
  name: string;
  description: string;
  limitation_days: number;
  price: number;
  active: boolean;
  archive: boolean;
  options: Options;
}

export interface TariffResponse extends Tariff {
  id: number;
}

export interface TariffForm {
  name: string;
  description: string;
  limitation_days: number | '';
  price: number | '';
  options: {
    parsers_per_day: number | '';
    simultaneous_parsing: number | '';
    geo: boolean;
    members: boolean;
    activity: boolean;
  };
}
