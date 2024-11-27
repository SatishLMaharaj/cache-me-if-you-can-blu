"use client";

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from '@/lib/faq-data';

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
        Frequently Asked Questions
      </h1>
      
      <div className="relative mb-8">
        <Input
          type="search"
          placeholder="Search FAQs..."
          className="w-full pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {filteredFaqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="bg-card rounded-lg border px-4"
          >
            <AccordionTrigger className="text-left hover:no-underline py-4">
              <span className="font-medium text-blue-600 dark:text-blue-400">
                {faq.question}
              </span>
            </AccordionTrigger>
            <AccordionContent className="prose dark:prose-invert max-w-none pb-4">
              {faq.answer.split('\n\n').map((paragraph, i) => (
                <p key={i} className="whitespace-pre-wrap">
                  {paragraph}
                </p>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {filteredFaqs.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No FAQs found matching your search.
        </div>
      )}
    </div>
  );
}