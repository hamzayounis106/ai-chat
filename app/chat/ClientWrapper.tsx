"use client";

import ClientChat from './ClientChat';

export default function ClientWrapper({ sessionId }: { sessionId: string }) {
  return (
    <div className="h-full">
      <ClientChat sessionId={sessionId} />
    </div>
  );
}
