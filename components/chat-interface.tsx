"use client";

import { useState, useEffect, useRef } from "react";
import { SendHorizontal, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "@/components/chat-message";
import { AudioInput } from "@/components/audio-input";
import { AccountsDisplay } from "@/components/accounts-display";
import { ExchangeRatesDisplay } from "@/components/exchange-rates-display";
import { USER_ACCOUNTS, USER_CREDIT_CARDS } from "@/lib/account-data";
import { getExchangeRateMessage } from "@/lib/exchange-rates";
import { supabase } from "@/lib/supabase";
import { useTranslation } from "react-i18next";

export default function ChatInterface() {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string, showAccounts?: boolean, showExchangeRates?: boolean }>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [ttsEnabled, setTTSEnabled] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{
      role: 'assistant',
      content: t('initialMessage', {
        defaultValue: 'Hello! I\'m BluBot, your banking assistant. How can I help you today? You can ask me about:\n\n- Your account balances and credit cards (requires login)\n- Types of loans and their terms\n- Credit card options and benefits\n- Different types of bank accounts\n- Current exchange rates\n\nYou can type your question or click the microphone icon to speak.'
      })
    }]);
  }, [i18n.language, t]);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    await processUserInput(input.trim());
  };

  const handleTranscript = async (transcript: string) => {
    if (!transcript.trim() || isLoading) return;
    await processUserInput(transcript.trim());
  };

  const processUserInput = async (text: string) => {
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setIsLoading(true);
    scrollToBottom();

    try {
      const response = await simulateResponse(text, isAuthenticated, t);
      setMessages(prev => [...prev, response]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: t('errorMessage', 'I apologize, but I encountered an error. Please try again.')
      }]);
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto min-h-[400px] h-[calc(100vh-12rem)] bg-background rounded-lg border shadow-lg flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="font-semibold text-lg text-blue-600 dark:text-blue-400">
          {t('chatTitle', 'Banking Assistant')}
        </h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTTSEnabled(!ttsEnabled)}
          className="text-muted-foreground hover:text-foreground"
          title={ttsEnabled ? 'Disable text-to-speech' : 'Enable text-to-speech'}
        >
          {ttsEnabled ? (
            <Volume2 className="h-4 w-4" />
          ) : (
            <VolumeX className="h-4 w-4" />
          )}
        </Button>
      </div>
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, i) => (
            <div key={i}>
              <ChatMessage 
                message={message} 
                isLatest={i === messages.length - 1}
                ttsEnabled={ttsEnabled}
              />
              {message.showAccounts && isAuthenticated && (
                <div className="mt-4">
                  <AccountsDisplay 
                    accounts={USER_ACCOUNTS}
                    creditCards={USER_CREDIT_CARDS}
                  />
                </div>
              )}
              {message.showExchangeRates && (
                <div className="mt-4">
                  <ExchangeRatesDisplay />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
            </div>
          )}
        </div>
      </ScrollArea>
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('askAbout')}
            className="flex-1"
            disabled={isLoading}
          />
          <div className="flex-shrink-0 flex gap-2">
            <AudioInput 
              onTranscript={handleTranscript}
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading} className="flex-shrink-0">
              <SendHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

async function simulateResponse(
  message: string, 
  isAuthenticated: boolean,
  t: (key: string, defaultValue: string) => string
): Promise<{ role: 'assistant', content: string, showAccounts?: boolean, showExchangeRates?: boolean }> {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('balance') || lowerMessage.includes('account') || lowerMessage.includes('credit card')) {
    if (!isAuthenticated) {
      return {
        role: 'assistant',
        content: t('loginRequired', 'To view your account balances and credit card information, please sign in first using the button in the top right corner.')
      };
    }
    return {
      role: 'assistant',
      content: t('accountInfo', 'Here are your current account balances and credit card information:'),
      showAccounts: true
    };
  }
  
  if (lowerMessage.includes('exchange') || lowerMessage.includes('rate') || lowerMessage.includes('currency')) {
    return {
      role: 'assistant',
      content: getExchangeRateMessage(),
      showExchangeRates: true
    };
  }
  
  if (lowerMessage.includes('loan')) {
    return {
      role: 'assistant',
      content: t('loanInfo', `We offer several types of loans:\n\n1. Personal Loans\n- Interest rates from 5.99% APR\n- Terms up to 7 years\n- No prepayment penalties\n\n2. Home Mortgages\n- Fixed and adjustable rates\n- Terms: 15, 20, or 30 years\n- Down payments as low as 3.5%\n\n3. Auto Loans\n- Rates from 3.99% APR\n- Terms up to 72 months\n- New and used vehicles`)
    };
  }
  
  return {
    role: 'assistant',
    content: t('helpOptions', `I can help you with information about:\n- Your account balances and credit cards (requires login)\n- Loans (personal, mortgage, auto)\n- Credit Cards (rewards, travel, business)\n- Bank Accounts (checking, savings, business)\n- Exchange Rates (daily updates)\n\nWhat would you like to know more about?`)
  };
}