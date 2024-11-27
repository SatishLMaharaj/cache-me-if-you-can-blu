"use client";

import { useState, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AudioInputProps {
  onTranscript: (text: string) => void;
  disabled?: boolean;
}

export function AudioInput({ onTranscript, disabled }: AudioInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPermissionDialog, setShowPermissionDialog] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onTranscript(transcript);
        setIsListening(false);
        setError(null);
      };

      recognition.onerror = (event) => {
        setIsListening(false);
        
        switch (event.error) {
          case 'not-allowed':
            setError('Microphone access denied');
            setShowPermissionDialog(true);
            break;
          case 'no-speech':
            setError('No speech detected');
            break;
          case 'network':
            setError('Network error occurred');
            break;
          default:
            setError('An error occurred');
            console.error('Speech recognition error:', event.error);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognition);
    }

    return () => {
      if (recognition) {
        recognition.abort();
      }
    };
  }, [onTranscript]);

  const toggleListening = async () => {
    if (!recognition) return;

    try {
      if (isListening) {
        recognition.stop();
        setIsListening(false);
      } else {
        // Check if we have microphone permission
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop()); // Clean up the stream
        
        recognition.start();
        setIsListening(true);
        setError(null);
      }
    } catch (err) {
      setError('Microphone access denied');
      setShowPermissionDialog(true);
    }
  };

  if (!recognition) {
    return null;
  }

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "relative",
          isListening && "border-primary",
          error && "border-destructive"
        )}
        onClick={toggleListening}
        disabled={disabled}
        title={error || 'Click to speak'}
      >
        {isListening ? (
          <>
            <MicOff className="h-5 w-5 text-destructive" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
          </>
        ) : (
          <Mic className={cn("h-5 w-5", error && "text-destructive")} />
        )}
        <span className="sr-only">
          {isListening ? 'Stop listening' : 'Start listening'}
        </span>
      </Button>

      <Dialog open={showPermissionDialog} onOpenChange={setShowPermissionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Microphone Access Required</DialogTitle>
            <DialogDescription asChild>
              <div className="space-y-4">
                <div>
                  To use voice input, please allow microphone access in your browser settings.
                  Here's how:
                </div>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Click the camera/microphone icon in your browser's address bar</li>
                  <li>Select "Allow" for microphone access</li>
                  <li>Refresh the page</li>
                </ol>
                <div className="text-sm text-muted-foreground">
                  Your voice data is processed locally and is not stored or transmitted.
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}