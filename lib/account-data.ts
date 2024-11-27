export interface Account {
  id: string;
  type: 'CHQ' | 'SAV' | 'LOAN';
  number: string;
  balance: number;
  currency: string;
  name: string;
}

export interface CreditCard {
  id: string;
  type: string;
  number: string;
  balance: number;
  limit: number;
  currency: string;
  expiryMonth: number;
  expiryYear: number;
}

// Simulated user data
export const USER_ACCOUNTS: Account[] = [
  {
    id: '1',
    type: 'CHQ',
    number: '****1234',
    balance: 5420.50,
    currency: 'USD',
    name: 'Primary Checking'
  },
  {
    id: '2',
    type: 'SAV',
    number: '****5678',
    balance: 12750.75,
    currency: 'USD',
    name: 'High-Yield Savings'
  },
  {
    id: '3',
    type: 'LOAN',
    number: '****9012',
    balance: -150000.00,
    currency: 'USD',
    name: 'Home Mortgage'
  }
];

export const USER_CREDIT_CARDS: CreditCard[] = [
  {
    id: '1',
    type: 'Rewards Platinum',
    number: '****4321',
    balance: 1250.00,
    limit: 10000.00,
    currency: 'USD',
    expiryMonth: 12,
    expiryYear: 25
  },
  {
    id: '2',
    type: 'Travel Elite',
    number: '****8765',
    balance: 3750.25,
    limit: 15000.00,
    currency: 'USD',
    expiryMonth: 8,
    expiryYear: 26
  }
];