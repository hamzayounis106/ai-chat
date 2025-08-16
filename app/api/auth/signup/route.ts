import { NextResponse } from 'next/server';
import { connect } from '@/lib/mongoose';
import User from '@/models/User';
import { hashPassword } from '@/lib/auth';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password, name } = body;
  
  if (!email || !password) {
    return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
  }

  await connect();
  const existing = await User.findOne({ email }).lean();
  
  if (existing) {
    return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
  }

  const passwordHash = await hashPassword(password);
  await User.create({ email, passwordHash, name });

  return NextResponse.json({ success: true, message: 'Account created successfully' });
}
