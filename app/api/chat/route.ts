import { NextResponse } from 'next/server';
import { connect } from '../../../lib/mongoose';
import Chat from '../../../models/Chat';
import Message from '../../../models/Message';
import { getAuthSession } from '../../../lib/auth';
import { randomUUID } from 'crypto';

const GEMENEI_API_KEY = process.env.GEMENEI_API_KEY || '';
const GEMENEI_API_URL = process.env.GEMENEI_API_URL || '';

async function callGemini(prompt: string) {
  // If the user hasn't configured Gemini, return a safe stub reply.
  if (!GEMENEI_API_KEY || !GEMENEI_API_URL || GEMENEI_API_URL.includes('example')) {
    return `Gemini not configured. This is a placeholder reply for: "${prompt.slice(0, 120)}"`;
  }

  try {
    // Google Gemini API format
    const url = `${GEMENEI_API_URL}?key=${GEMENEI_API_KEY}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      }),
    });

    if (!res.ok) {
      const txt = await res.text();
      console.error('Gemini responded with non-OK:', res.status, txt);
      return `Gemini error: ${res.status} - ${txt}`;
    }

    const data = await res.json();
    
    // Extract text from Gemini response format
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
      return data.candidates[0].content.parts[0].text;
    }
    
    return `Unexpected Gemini response format: ${JSON.stringify(data)}`;
  } catch (err: any) {
    console.error('callGemini error', err);
    return `Gemini call failed: ${err?.message ?? String(err)}`;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('s');
  if (!sessionId) return NextResponse.json({ error: 'Missing session id' }, { status: 400 });

  await connect();
  const messages = await Message.find({ sessionId }).sort({ createdAt: 1 }).lean();
  return NextResponse.json({ sessionId, messages });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { sessionId, message } = body;
  if (!message) return NextResponse.json({ error: 'Missing message' }, { status: 400 });

  await connect();

  let sid = sessionId;
  if (!sid) sid = randomUUID();

  // For now, allow unauthenticated chat - create chat without userId requirement
  let chat = await Chat.findOne({ sessionId: sid });
  if (!chat) {
    chat = await Chat.create({ sessionId: sid, userId: null } as any);
  }

  // persist user message
  await Message.create({ sessionId: sid, role: 'user', content: message });

  // call Gemenei
  const reply = await callGemini(message);

  // persist assistant message
  await Message.create({ sessionId: sid, role: 'assistant', content: reply });

  return NextResponse.json({ sessionId: sid, reply });
}
