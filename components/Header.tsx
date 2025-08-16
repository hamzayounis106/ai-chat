"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { getMessageUsage } from '@/lib/messageLimit';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      const usage = getMessageUsage();
      setIsPro(usage.isPro);
    }
    
    // Listen for storage changes to update pro status
    const updateProStatus = () => {
      if (session) {
        const usage = getMessageUsage();
        setIsPro(usage.isPro);
      }
    };
    
    window.addEventListener('storage', updateProStatus);
    return () => window.removeEventListener('storage', updateProStatus);
  }, [session]);

  const handleLogout = () => {
    signOut({ callbackUrl: '/login' });
  };

  return (
    <header className="card mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="text-xl font-bold flex items-center gap-2">
            &gt;&gt;&gt; AI CHAT TERMINAL v1.0
            {isPro && (
              <span className="bg-green-400 text-black px-2 py-1 text-xs font-mono rounded">
                PRO
              </span>
            )}
          </div>
          <nav className="hidden md:flex gap-6 text-sm">
            {session ? (
              <>
                <Link href="/chat">[CHAT]</Link>
                <Link href="/pricing">[PRICING]</Link>
              </>
            ) : (
              <>
                <Link href="/login">[LOGIN]</Link>
                <Link href="/signup">[SIGNUP]</Link>
                <Link href="/pricing">[PRICING]</Link>
              </>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {session ? (
            <div className="relative">
              <button 
                className="btn" 
                onClick={() => setOpen((o) => !o)}
              >
                [{session.user?.email || 'USER'}] ▼
              </button>

              {open && (
                <div className="absolute right-0 mt-1 w-40 card">
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left p-2 hover:bg-gray-800"
                  >
                    [LOGOUT]
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              <Link href="/login" className="btn">
                [LOGIN]
              </Link>
              <Link href="/signup" className="btn">
                [SIGNUP]
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
