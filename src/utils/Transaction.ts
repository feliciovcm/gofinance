import uuid from 'react-native-uuid';
import { format } from 'date-fns'

export class Transaction {
  
  id?: string;
  
  title: string;

  amount: number;

  type: string;

  category: string;

  date?: Date;

  constructor(
    title: string,
    amount: number,
    type: string,
    category: string
  ) {
    this.title = title;
    this.amount = amount;
    this.type = type;
    this.category = category;
    this.date = new Date();

    if (!this.id) {
      this.id = String(uuid.v4())
    }
  }
}