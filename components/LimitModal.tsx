"use client";

interface LimitModalProps {
  isOpen: boolean;
  onClose: () => void;
  remainingMessages: number;
}

export default function LimitModal({ isOpen, onClose, remainingMessages }: LimitModalProps) {
  if (!isOpen) return null;

  const isBlocked = remainingMessages <= 0;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="card max-w-md w-full border-red-400 bg-red-900/20">
        <div className="text-center mb-6">
          <div className="text-3xl mb-2">⚠️</div>
          <h2 className="text-xl font-mono text-red-400 mb-2">
            {isBlocked ? '[DAILY LIMIT REACHED]' : '[LOW MESSAGES WARNING]'}
          </h2>
          <p className="text-gray-400 font-mono text-sm">
            {isBlocked 
              ? 'You have used all 20 free messages for today. Please upgrade to continue chatting.'
              : `You have ${remainingMessages} message${remainingMessages === 1 ? '' : 's'} remaining today.`
            }
          </p>
        </div>

        <div className="space-y-4">
          {isBlocked && (
            <div className="bg-gray-900 p-4 rounded border border-gray-600">
              <h3 className="font-mono text-green-400 mb-2">FREE TIER LIMITS:</h3>
              <ul className="text-sm text-gray-400 font-mono space-y-1">
                <li>• 20 messages per day</li>
                <li>• Resets at midnight</li>
                <li>• Basic AI responses only</li>
              </ul>
            </div>
          )}

          <div className="bg-green-900/20 p-4 rounded border border-green-400">
            <h3 className="font-mono text-green-400 mb-2">PRO TIER BENEFITS:</h3>
            <ul className="text-sm text-gray-400 font-mono space-y-1">
              <li>• Unlimited messages</li>
              <li>• Priority processing</li>
              <li>• Advanced features</li>
              <li>• Email support</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={onClose} 
              className="btn flex-1 border-gray-600 hover:bg-gray-800"
            >
              {isBlocked ? '[CLOSE]' : '[CONTINUE]'}
            </button>
            <a 
              href="mailto:hamza@creatic.pro?subject=AI Chat Pro Upgrade Request&body=Hi, I would like to upgrade to the Pro tier to get unlimited messages. Please provide payment details and upgrade instructions."
              className="btn flex-1 bg-green-400 text-black hover:bg-green-300 text-center"
            >
              [UPGRADE PRO]
            </a>
          </div>

          {isBlocked && (
            <div className="text-center">
              <p className="text-xs text-gray-500 font-mono">
                Your free messages will reset tomorrow at midnight.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
