// Lightweight shim for anthropic client usage placeholder
export async function anthropicGenerate(prompt: string) {
  // Forward to our chat API; in a full integration this would call Anthropic endpoints
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: prompt }),
  });
  const data = await res.json();
  return data.reply;
}
