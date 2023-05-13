import { Card } from './card';
import { Operation } from './operation';

export interface User {
  id: number;
  name: string;
  balance: number;
  cards: Card[];
  operations: Operation[];
}
