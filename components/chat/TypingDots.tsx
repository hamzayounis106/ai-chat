"use client";

export default function TypingDots() {
  return (
    <div className="flex items-center gap-2">
      <span className="w-2 h-2 bg-white rounded-full animate-bounce-delay" style={{ animationDelay: '0s' }} />
      <span className="w-2 h-2 bg-white rounded-full animate-bounce-delay" style={{ animationDelay: '0.12s' }} />
      <span className="w-2 h-2 bg-white rounded-full animate-bounce-delay" style={{ animationDelay: '0.24s' }} />
    </div>
  );
}
