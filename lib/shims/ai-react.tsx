"use client";

import { useState } from 'react';

// Very small shim for useCompletion to mimic a hook interface.
export function useCompletion(options?: { model?: string }) {
  const [loading, setLoading] = useState(false);

  async function complete(input: string) {
    setLoading(true);
    try {
      // Call our local /api/chat to reuse Gemenei proxy
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      return data.reply;
    } finally {
      setLoading(false);
    }
  }

  return { complete, loading } as const;
}
