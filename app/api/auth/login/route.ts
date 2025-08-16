import { NextResponse } from 'next/server';
import { connect } from '../../../../lib/mongoose';
import User from '../../../../models/User';
import { comparePassword } from '../../../../lib/auth';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;
  
  if (!email || !password) {
    return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
  }

  await connect();
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const isValidPassword = await comparePassword(password, user.passwordHash);
  if (!isValidPassword) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // Since you're using NextAuth.js, authentication should be handled through NextAuth
  // This endpoint can be used for additional validation if needed
  return NextResponse.json({ 
    success: true, 
    user: { 
      id: user._id.toString(), 
      email: user.email, 
      name: user.name 
    } 
  });
}
