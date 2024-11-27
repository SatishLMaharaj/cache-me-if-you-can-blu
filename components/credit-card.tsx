import { Card, CardContent } from "@/components/ui/card";
import { CreditCard as ICreditCard } from "@/lib/account-data";
import { formatCurrency } from "@/lib/exchange-rates";
import { CreditCard as CreditCardIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface CreditCardProps {
  card: ICreditCard;
}

export function CreditCardDisplay({ card }: CreditCardProps) {
  const utilizationPercentage = (card.balance / card.limit) * 100;
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200 border-blue-100/50 dark:border-blue-900/50">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <CreditCardIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="font-semibold text-sm text-muted-foreground">
                  {card.type}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{card.number}</p>
              <p className="text-xs text-muted-foreground">
                Expires: {card.expiryMonth.toString().padStart(2, '0')}/{card.expiryYear}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                {formatCurrency(card.balance, card.currency)}
              </p>
              <p className="text-sm text-muted-foreground">
                of {formatCurrency(card.limit, card.currency)}
              </p>
            </div>
          </div>
          <div className="space-y-1">
            <Progress value={utilizationPercentage} className="bg-blue-100 dark:bg-blue-950" />
            <p className="text-xs text-muted-foreground text-right">
              {utilizationPercentage.toFixed(1)}% utilized
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}