import { User } from './user';

export type PaymentAction = 'credit' | 'debit';

export interface Payment {
  id: number;
  user_id: number;
  date: string;
  action: PaymentAction;
  amount: 10;
  status: boolean;
  user: User;
}
