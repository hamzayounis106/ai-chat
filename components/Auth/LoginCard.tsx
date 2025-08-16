"use client";

import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginCard({ onLogin }: { onLogin?: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Attempting to sign in with:', { email });
      
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      console.log('Sign in result:', result);

      if (result?.error) {
        setError('Invalid credentials');
      } else if (result?.ok) {
        onLogin?.();
        router.push('/chat');
        router.refresh();
      }
    } catch (err) {
      console.error('Sign in error:', err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card max-w-md mx-auto p-6">
      <div className="text-center mb-4">
        <div className="text-2xl font-bold">AI Chat</div>
        <div className="muted">Welcome back</div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {error && (
          <div className="p-2 bg-red-900/50 border border-red-600 text-red-400 text-sm">
            ERROR: {error}
          </div>
        )}
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
        <div className="flex justify-end">
          <button type="submit" className="btn" disabled={loading}>
            {loading ? '[LOGGING IN...]' : '[LOGIN]'}
          </button>
        </div>
      </form>

      <div className="text-center mt-4 muted">
        Don't have an account? <Link href="/signup" className="text-accent">Sign up</Link>
      </div>
    </div>
  );
}
