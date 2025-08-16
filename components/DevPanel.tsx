"use client";

import { useState, useEffect } from 'react';
import { 
  getMessageUsage, 
  upgradeToProTier, 
  resetToFreeTier,
  getRemainingMessages 
} from '@/lib/messageLimit';

export default function DevPanel() {
  const [usage, setUsage] = useState({ date: '', count: 0, isPro: false });
  const [isVisible, setIsVisible] = useState(false);

  const updateUsage = () => {
    setUsage(getMessageUsage());
  };

  useEffect(() => {
    updateUsage();
  }, []);

  const handleUpgrade = () => {
    upgradeToProTier();
    updateUsage();
    alert('Upgraded to Pro tier!');
  };

  const handleDowngrade = () => {
    resetToFreeTier();
    updateUsage();
    alert('Reset to Free tier!');
  };

  const resetCount = () => {
    localStorage.removeItem('messageUsage');
    updateUsage();
    alert('Message count reset!');
  };

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <>
      <button 
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white px-3 py-1 text-xs rounded z-50"
      >
        {isVisible ? 'Hide Dev' : 'Dev Panel'}
      </button>

      {isVisible && (
        <div className="fixed bottom-16 right-4 bg-gray-900 border border-gray-600 p-4 rounded-lg text-xs font-mono z-50 max-w-xs">
          <h3 className="text-green-400 mb-2">DEV PANEL</h3>
          
          <div className="space-y-2 mb-4">
            <div>Date: {usage.date}</div>
            <div>Messages Used: {usage.count}/20</div>
            <div>Remaining: {getRemainingMessages()}</div>
            <div>Pro Status: {usage.isPro ? 'YES' : 'NO'}</div>
          </div>

          <div className="space-y-2">
            <button 
              onClick={handleUpgrade}
              className="w-full bg-green-600 text-white px-2 py-1 rounded text-xs"
            >
              Test Pro Upgrade
            </button>
            <button 
              onClick={handleDowngrade}
              className="w-full bg-red-600 text-white px-2 py-1 rounded text-xs"
            >
              Reset to Free
            </button>
            <button 
              onClick={resetCount}
              className="w-full bg-blue-600 text-white px-2 py-1 rounded text-xs"
            >
              Reset Count
            </button>
          </div>
        </div>
      )}
    </>
  );
}
