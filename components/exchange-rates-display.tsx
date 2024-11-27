"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AVAILABLE_CURRENCIES, formatCurrency } from "@/lib/exchange-rates";
import { DollarSign } from "lucide-react";

export function ExchangeRatesDisplay() {
  const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="space-y-4 w-full max-w-3xl">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Exchange Rates</h2>
        <p className="text-sm text-muted-foreground">{date}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {AVAILABLE_CURRENCIES.filter(curr => curr.code !== 'USD').map((currency) => (
          <Card key={currency.code} className="overflow-hidden hover:shadow-lg transition-shadow duration-200 border-blue-100/50 dark:border-blue-900/50">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span className="font-bold">{currency.code}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{currency.name}</p>
                </div>
                <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                  {formatCurrency(currency.rate, 'USD')}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="text-sm text-muted-foreground text-center">
        Base Currency: USD | Rates updated daily
      </p>
    </div>
  );
}