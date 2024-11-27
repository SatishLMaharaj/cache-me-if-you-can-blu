import { Account, CreditCard } from "@/lib/account-data";
import { AccountCard } from "@/components/account-card";
import { CreditCardDisplay } from "@/components/credit-card";

interface AccountsDisplayProps {
  accounts: Account[];
  creditCards: CreditCard[];
}

export function AccountsDisplay({ accounts, creditCards }: AccountsDisplayProps) {
  return (
    <div className="space-y-6 w-full max-w-3xl">
      {accounts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Your Accounts</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {accounts.map((account) => (
              <AccountCard key={account.id} account={account} />
            ))}
          </div>
        </div>
      )}
      
      {creditCards.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Your Credit Cards</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {creditCards.map((card) => (
              <CreditCardDisplay key={card.id} card={card} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}