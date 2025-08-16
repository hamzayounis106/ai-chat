"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function SignupCard() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (!agreed) {
      setError('You must agree to the Terms & Privacy');
      setLoading(false);
      return;
    }

    try {
      // First create the account
      const signupRes = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const signupData = await signupRes.json();

      if (signupRes.ok && signupData.success) {
        // Then sign in with NextAuth
        const result = await signIn('credentials', {
          email,
          password,
          redirect: false,
        });

        if (result?.ok) {
          router.push('/chat');
          router.refresh();
        } else {
          setError('Account created but login failed. Please try logging in.');
        }
      } else {
        setError(signupData.error || 'Signup failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card max-w-md mx-auto p-6">
      <div className="text-center mb-4">
        <div className="text-2xl font-bold">AI Chat</div>
        <div className="muted">Create your account</div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {error && (
          <div className="p-2 bg-red-900/50 border border-red-600 text-red-400 text-sm">
            ERROR: {error}
          </div>
        )}
        <input 
          className="form-input" 
          placeholder="Name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={loading}
        />
        <input 
          className="form-input" 
          type="email"
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <input 
          className="form-input" 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />
        <input 
          className="form-input" 
          type="password" 
          placeholder="Confirm Password" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={loading}
        />
        <label className="flex items-center gap-2">
          <input 
            type="checkbox" 
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            disabled={loading}
          /> 
          I agree to the Terms & Privacy
        </label>
        <div className="flex justify-end">
          <button type="submit" className="btn" disabled={loading || !agreed}>
            {loading ? '[CREATING...]' : '[CREATE ACCOUNT]'}
          </button>
        </div>
      </form>

      <div className="text-center mt-4 muted">
        Already have an account? <Link href="/login" className="text-accent">Login</Link>
      </div>
    </div>
  );
}
