"use client";

export default function MessageBubble({ role, content }: { role: string; content: string }) {
  return (
    <div className={`max-w-[80%] p-3 rounded-2xl ${role === 'assistant' ? 'chat-assistant' : 'chat-user'} animate-fadeup`}>
      <div className="text-sm muted">{role}</div>
      <div className="mt-1 whitespace-pre-wrap">{content}</div>
    </div>
  );
}
