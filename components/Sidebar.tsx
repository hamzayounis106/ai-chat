"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ChatSession {
  id: string;
  title: string;
  lastMessage?: string;
  updatedAt: Date;
}

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const router = useRouter();

  // Load sessions from localStorage (or you could fetch from API)
  useEffect(() => {
    const loadSessions = () => {
      const stored = localStorage.getItem('chatSessions');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setSessions(parsed.map((s: any) => ({
            ...s,
            updatedAt: new Date(s.updatedAt)
          })).sort((a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()));
        } catch (e) {
          console.error('Error parsing sessions:', e);
          setSessions([]);
        }
      }
    };
    
    loadSessions();
    
    // Listen for storage changes and custom events
    const handleStorageChange = () => {
      setTimeout(loadSessions, 100); // Small delay to ensure localStorage is updated
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('sessionUpdate', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('sessionUpdate', handleStorageChange);
    };
  }, []);

  const filteredSessions = sessions.filter(session => 
    session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (session.lastMessage && session.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleNewSession = () => {
    const newSessionId = crypto.randomUUID();
    router.push(`/chat?sessionId=${newSessionId}`);
  };

  const handleSessionClick = (sessionId: string) => {
    router.push(`/chat?sessionId=${sessionId}`);
  };

  return (
    <aside className={`transition-all duration-300 ${open ? 'w-80' : 'w-16'} h-full flex flex-col bg-black border border-gray-600 p-4`}>
      {open && (
        <>
          <div className="mb-4">
            <div className="text-sm muted mb-2">SEARCH:</div>
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="QUERY..." 
              className="form-input" 
            />
          </div>

          <button onClick={handleNewSession} className="btn w-full mb-4">
            [+ NEW SESSION]
          </button>

          <div className="text-sm muted mb-2">
            ACTIVE SESSIONS: ({filteredSessions.length})
          </div>
          <nav className="space-y-1 flex-1 overflow-y-auto custom-scrollbar">
            {filteredSessions.length === 0 ? (
              <div className="p-2 text-gray-500 text-sm">
                {searchQuery ? 'NO MATCHES FOUND' : 'NO SESSIONS YET'}
              </div>
            ) : (
              filteredSessions.map((session) => (
                <div 
                  key={session.id} 
                  onClick={() => handleSessionClick(session.id)}
                  className="p-2 border border-gray-600 hover:bg-gray-800 cursor-pointer transition-colors group"
                >
                  <div className="font-mono text-sm text-green-400">
                    {session.title}
                  </div>
                  {session.lastMessage && (
                    <div className="text-xs text-gray-400 mt-1 truncate">
                      {session.lastMessage.slice(0, 50)}...
                    </div>
                  )}
                  <div className="text-xs text-gray-500 mt-1">
                    {session.updatedAt.toLocaleDateString()}
                  </div>
                </div>
              ))
            )}
          </nav>
        </>
      )}

      <button 
        onClick={() => setOpen((v) => !v)} 
        className="mt-4 btn w-full flex items-center justify-center"
      >
        {open ? '[HIDE]' : '[☰]'}
      </button>
    </aside>
  );
}
