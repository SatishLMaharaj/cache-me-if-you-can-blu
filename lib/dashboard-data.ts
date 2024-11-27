export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
}

export interface SpendingByCategory {
  category: string;
  amount: number;
}

export interface MonthlySpending {
  month: string;
  amount: number;
}

export const TRANSACTIONS: Transaction[] = [
  { id: '1', date: '2024-02-28', description: 'Grocery Store', amount: -125.50, category: 'Groceries' },
  { id: '2', date: '2024-02-27', description: 'Gas Station', amount: -45.00, category: 'Transportation' },
  { id: '3', date: '2024-02-26', description: 'Restaurant', amount: -65.75, category: 'Dining' },
  { id: '4', date: '2024-02-25', description: 'Online Shopping', amount: -89.99, category: 'Shopping' },
  { id: '5', date: '2024-02-24', description: 'Utility Bill', amount: -150.00, category: 'Utilities' },
];

export const SPENDING_BY_CATEGORY: SpendingByCategory[] = [
  { category: 'Groceries', amount: 520.75 },
  { category: 'Transportation', amount: 245.00 },
  { category: 'Dining', amount: 325.50 },
  { category: 'Shopping', amount: 450.25 },
  { category: 'Utilities', amount: 380.00 },
  { category: 'Entertainment', amount: 175.50 },
];

export const MONTHLY_SPENDING: MonthlySpending[] = [
  { month: 'Sep', amount: 2150.50 },
  { month: 'Oct', amount: 2450.75 },
  { month: 'Nov', amount: 2100.25 },
  { month: 'Dec', amount: 2800.50 },
  { month: 'Jan', amount: 2300.75 },
  { month: 'Feb', amount: 2096.75 },
];