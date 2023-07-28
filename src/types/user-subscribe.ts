import { Options, TariffResponse } from './tariff';

export interface UserSubscribe {
  tariff: TariffResponse;
  tariff_options: Options;
  end_date: string;
}
