export interface ExchangeRate {
  code: string;
  name: string;
  rate: number;
}

export const AVAILABLE_CURRENCIES: ExchangeRate[] = [
  { code: 'USD', name: 'US Dollar', rate: 1.00 },
  { code: 'EUR', name: 'Euro', rate: 0.92 },
  { code: 'GBP', name: 'British Pound', rate: 0.79 },
  { code: 'JPY', name: 'Japanese Yen', rate: 150.42 },
  { code: 'AUD', name: 'Australian Dollar', rate: 1.53 },
  { code: 'CAD', name: 'Canadian Dollar', rate: 1.35 },
  { code: 'CHF', name: 'Swiss Franc', rate: 0.88 },
  { code: 'CNY', name: 'Chinese Yuan', rate: 7.19 },
];

export function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function getExchangeRateMessage(): string {
  const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return `Current exchange rates as of ${date}:`;
}