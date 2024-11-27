"use client";

import { useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

interface TypewriterEffectProps {
  text: string;
  onComplete?: () => void;
}

export function TypewriterEffect({ text, onComplete }: TypewriterEffectProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    let isMounted = true;
    setDisplayedText('');
    setIsComplete(false);

    const typeText = async () => {
      const chars = text.split('');
      let currentText = '';

      for (let i = 0; i < chars.length; i++) {
        if (!isMounted) break;

        currentText += chars[i];
        setDisplayedText(currentText);

        // Scroll the container to the bottom
        if (containerRef.current) {
          containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }

        // Adjust typing speed based on characters
        const delay = chars[i] === '\n' ? 100 : 20;
        await new Promise(resolve => {
          timeoutRef.current = setTimeout(resolve, delay);
        });
      }

      if (isMounted) {
        setIsComplete(true);
        if (onComplete) onComplete();
      }
    };

    typeText();

    return () => {
      isMounted = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, onComplete]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="prose dark:prose-invert max-w-none"
    >
      <ReactMarkdown
        components={{
          p: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
          ul: ({ children }) => <ul className="mb-4 list-disc pl-4">{children}</ul>,
          li: ({ children }) => <li className="mb-1">{children}</li>,
        }}
      >
        {displayedText}
      </ReactMarkdown>
    </motion.div>
  );
}