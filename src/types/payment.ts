export type PaymentAction = 'credit' | 'debit';

export interface Payment {
  id: number;
  date: string;
  action: PaymentAction;
  amount: number;
  status: boolean;
  email: string;
}
