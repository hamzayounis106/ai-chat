"use client";

import { useEffect, useState, useRef } from 'react';
import { 
  canSendMessage, 
  incrementMessageCount, 
  getRemainingMessages, 
  getMessageUsage 
} from '@/lib/messageLimit';
import LimitModal from '@/components/LimitModal';

export default function ClientChat({ sessionId }: { sessionId: string }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [remainingMessages, setRemainingMessages] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Update remaining messages count
  const updateRemainingMessages = () => {
    setRemainingMessages(getRemainingMessages());
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    updateRemainingMessages();
  }, []);

  // Save session to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      const sessions = JSON.parse(localStorage.getItem('chatSessions') || '[]');
      const existingIndex = sessions.findIndex((s: any) => s.id === sessionId);
      
      // Get the latest user or assistant message for preview
      const lastUserMessage = messages.filter(m => m.role === 'user').slice(-1)[0];
      const lastMessage = lastUserMessage?.content || messages[messages.length - 1]?.content || '';
      
      const sessionData = {
        id: sessionId,
        title: lastUserMessage ? lastUserMessage.content.slice(0, 30) + '...' : `SESSION_${sessionId.slice(0, 8)}`,
        lastMessage: lastMessage.slice(0, 100),
        updatedAt: new Date().toISOString(),
        messageCount: messages.length
      };

      if (existingIndex >= 0) {
        sessions[existingIndex] = sessionData;
      } else {
        sessions.unshift(sessionData);
      }

      // Keep only last 20 sessions
      if (sessions.length > 20) {
        sessions.splice(20);
      }

      localStorage.setItem('chatSessions', JSON.stringify(sessions));
      
      // Trigger both storage event and custom event for sidebar update
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new Event('sessionUpdate'));
    }
  }, [messages, sessionId]);

  useEffect(() => {
    // Clear messages when sessionId changes
    setMessages([]);
    
    async function load() {
      const res = await fetch(`/api/chat?s=${sessionId}`);
      const data = await res.json();
      if (data.messages && data.messages.length > 0) {
        setMessages(data.messages.map((m: any) => ({ role: m.role, content: m.content })));
      }
    }
    load();
  }, [sessionId]);

  // Format message content to handle markdown-like formatting
  const formatMessage = (content: string) => {
    // Replace **text** with bold
    content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Replace *text* with emphasis
    content = content.replace(/\*(.*?)\*/g, '<em>$1</em>');
    // Handle bullet points
    content = content.replace(/^\* (.+)$/gm, '• $1');
    // Handle line breaks
    content = content.replace(/\n/g, '<br>');
    
    return content;
  };

  async function send(e?: any) {
    e?.preventDefault?.();
    if (!message.trim()) return;

    // Check if user can send messages
    if (!canSendMessage()) {
      setShowLimitModal(true);
      return;
    }

    // Show warning when user has 3 or fewer messages left
    if (remainingMessages <= 3 && remainingMessages > 0) {
      setShowLimitModal(true);
      // Don't return here, let them continue after seeing the warning
    }

    const userMessage = message.trim();
    setMessage('');
    setLoading(true);
    
    // Increment message count for free users
    incrementMessageCount();
    updateRemainingMessages();
    
    setMessages((m) => [...m, { role: 'user', content: userMessage }]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, message: userMessage }),
      });
      
      const data = await res.json();
      
      if (data.reply) {
        setMessages((m) => [...m, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages((m) => [...m, { role: 'assistant', content: `ERROR: ${data.error || 'Unknown error'}` }]);
      }
    } catch (error) {
      setMessages((m) => [...m, { role: 'assistant', content: `NETWORK ERROR: ${error}` }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-full">
      <section className="flex-1 flex flex-col min-h-0">
        <div className="card flex-1 flex flex-col">
          <div className="text-sm muted mb-4 flex justify-between items-center">
            <span>SESSION: {sessionId.slice(0, 8)}...</span>
            <div className="flex items-center gap-4">
              <span>{messages.length} MESSAGES</span>
              {remainingMessages !== Infinity && (
                <span className={`${remainingMessages <= 5 ? 'text-red-400' : 'text-yellow-400'}`}>
                  {remainingMessages} FREE LEFT
                </span>
              )}
            </div>
          </div>
          
          <div 
            ref={messagesContainerRef}
            className="flex-1 overflow-auto border border-gray-600 p-4 mb-4 bg-black custom-scrollbar"
            style={{ maxHeight: 'calc(100vh - 300px)' }}
          >
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                <div className="text-lg mb-2">TERMINAL READY</div>
                <div className="text-sm">TYPE A MESSAGE TO BEGIN...</div>
              </div>
            ) : (
              messages.map((m, i) => (
                <div key={i} className={`chat-bubble ${m.role === 'assistant' ? 'chat-assistant' : 'chat-user'}`}>
                  <div className="text-xs muted flex justify-between">
                    <span>[{m.role.toUpperCase()}]:</span>
                    <span className="text-gray-600">{new Date().toLocaleTimeString()}</span>
                  </div>
                  <div 
                    className="mt-1 whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ __html: formatMessage(m.content) }}
                  />
                </div>
              ))
            )}
            {loading && (
              <div className="chat-bubble chat-assistant">
                <div className="text-xs muted">[ASSISTANT]: </div>
                <div className="mt-1 flex items-center gap-2">
                  <div className="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  PROCESSING...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <form onSubmit={send} className="flex gap-2 items-center">
            <span className="text-green-400 text-lg">&gt;</span>
            <input 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
              className="form-input flex-1" 
              placeholder="ENTER COMMAND..."
              disabled={loading}
              autoComplete="off"
            />
            <button disabled={loading || !message.trim()} className="btn">
              {loading ? '[WAIT...]' : '[SEND]'}
            </button>
          </form>
        </div>
      </section>

      {/* Limit Modal */}
      <LimitModal 
        isOpen={showLimitModal}
        onClose={() => setShowLimitModal(false)}
        remainingMessages={remainingMessages}
      />
    </div>
  );
}
