"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, User, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TypewriterEffect } from "@/components/typewriter-effect";
import ReactMarkdown from 'react-markdown';
import { useTTS } from "@/hooks/use-tts";

interface ChatMessageProps {
  message: {
    role: 'user' | 'assistant';
    content: string;
  };
  isLatest: boolean;
  ttsEnabled: boolean;
}

export function ChatMessage({ message, isLatest, ttsEnabled }: ChatMessageProps) {
  const isAssistant = message.role === 'assistant';
  const { speak, speaking, stop } = useTTS();
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = async () => {
    if (isPlaying) {
      stop();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      await speak(message.content);
      setIsPlaying(false);
    }
  };

  return (
    <div className={`flex items-start gap-4 ${isAssistant ? 'bg-blue-50/50 dark:bg-blue-950/20 p-4 rounded-lg' : 'flex-row-reverse'}`}>
      <Avatar className="mt-1">
        {isAssistant ? (
          <>
            <AvatarImage src="/bot-avatar.png" />
            <AvatarFallback className="bg-blue-100 text-blue-700">
              <Bot className="h-5 w-5" />
            </AvatarFallback>
          </>
        ) : (
          <>
            <AvatarImage src="/user-avatar.png" />
            <AvatarFallback className="bg-primary/10">
              <User className="h-5 w-5" />
            </AvatarFallback>
          </>
        )}
      </Avatar>
      <div className={`flex-1 ${!isAssistant ? 'text-right' : ''}`}>
        <div className="flex items-start gap-2">
          <div className="flex-1">
            {isAssistant && isLatest ? (
              <TypewriterEffect text={message.content} />
            ) : (
              <div className={`prose dark:prose-invert max-w-none ${!isAssistant ? 'ml-auto bg-primary text-primary-foreground p-3 rounded-lg inline-block' : ''}`}>
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
                    ul: ({ children }) => <ul className="mb-4 list-disc pl-4">{children}</ul>,
                    li: ({ children }) => <li className="mb-1">{children}</li>,
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            )}
          </div>
          {isAssistant && ttsEnabled && (
            <Button
              variant="ghost"
              size="icon"
              className="mt-1 shrink-0"
              onClick={handleSpeak}
            >
              {isPlaying ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}