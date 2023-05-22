import { Card } from './card';
import { Operation } from './operation';

export interface User {
  id: number;
  avatar: string;
  firstName: string;
  lastName: string;
  //TODO: Убрать лишнее
  balance: number;
  cards: Card[];
  operations: Operation[];
}
