export interface Expense {
  _id?: string;
  userId?: string;
  amount: number;
  category: string;
  date: string;
  note?: string;
}
