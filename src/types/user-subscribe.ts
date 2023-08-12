import { Options } from './tariff';

export interface UserSubscribe {
  id: number;
  user_id: number;
  tariff_id: number;
  end_date: string;
  tariff_options: Options;
  auto_debit: boolean;
}
