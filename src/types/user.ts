import { Card } from './card';
import { Operation } from './operation';

export interface User {
  id: number;
  avatar: string;
  firstname: string;
  lastname: string;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;
  //TODO: Убрать лишнее
  balance: number;
  cards: Card[];
  operations: Operation[];
}
