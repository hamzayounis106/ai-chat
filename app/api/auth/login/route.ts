import { NextResponse } from 'next/server';
import { connect } from '../../../../lib/mongoose';
import User from '../../../../models/User';
import { comparePassword, signJwt } from '../../../../lib/auth';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;
  if (!email || !password) {
    return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
  }

  await connect();
  const user = await User.findOne({ email });
  if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

  const ok = await comparePassword(password, user.passwordHash);
  if (!ok) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

  const token = signJwt({ sub: user._id, email: user.email });
  
  const response = NextResponse.json({ token, success: true });
  
  // Set the token as a secure cookie
  response.cookies.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7 // 7 days
  });
  
  return response;
}
