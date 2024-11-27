import { Card, CardContent } from "@/components/ui/card";
import { Account } from "@/lib/account-data";
import { formatCurrency } from "@/lib/exchange-rates";
import { CreditCard, Wallet } from "lucide-react";

interface AccountCardProps {
  account: Account;
}

export function AccountCard({ account }: AccountCardProps) {
  const isNegative = account.balance < 0;
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200 border-blue-100/50 dark:border-blue-900/50">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Wallet className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span className="font-semibold text-sm text-muted-foreground">
                {account.type}
              </span>
            </div>
            <h3 className="font-bold">{account.name}</h3>
            <p className="text-sm text-muted-foreground">{account.number}</p>
          </div>
          <p className={`text-xl font-bold ${isNegative ? 'text-destructive' : 'text-blue-600 dark:text-blue-400'}`}>
            {formatCurrency(Math.abs(account.balance), account.currency)}
            {isNegative && ' DR'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}