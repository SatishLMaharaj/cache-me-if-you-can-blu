import ChatInterface from '@/components/chat-interface';

export default function Home() {
  return (
    <div className="container flex flex-col items-center justify-center gap-4">
      <ChatInterface />
    </div>
  );
}