// Message limit utilities for free tier users

export interface MessageUsage {
  date: string;
  count: number;
  isPro: boolean;
}

export const FREE_TIER_DAILY_LIMIT = 20;

export function getTodayKey(): string {
  return new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
}

export function getMessageUsage(): MessageUsage {
  const today = getTodayKey();
  const stored = localStorage.getItem('messageUsage');
  
  if (stored) {
    try {
      const usage = JSON.parse(stored);
      // If it's a new day, reset the count
      if (usage.date !== today) {
        return { date: today, count: 0, isPro: usage.isPro || false };
      }
      return usage;
    } catch {
      // If parsing fails, return default
      return { date: today, count: 0, isPro: false };
    }
  }
  
  return { date: today, count: 0, isPro: false };
}

export function incrementMessageCount(): MessageUsage {
  const usage = getMessageUsage();
  const newUsage = {
    ...usage,
    count: usage.count + 1
  };
  
  localStorage.setItem('messageUsage', JSON.stringify(newUsage));
  return newUsage;
}

export function canSendMessage(): boolean {
  const usage = getMessageUsage();
  
  // Pro users have unlimited messages
  if (usage.isPro) {
    return true;
  }
  
  // Free users are limited to daily limit
  return usage.count < FREE_TIER_DAILY_LIMIT;
}

export function getRemainingMessages(): number {
  const usage = getMessageUsage();
  
  if (usage.isPro) {
    return Infinity;
  }
  
  return Math.max(0, FREE_TIER_DAILY_LIMIT - usage.count);
}

export function upgradeToProTier(): void {
  const usage = getMessageUsage();
  const newUsage = {
    ...usage,
    isPro: true
  };
  
  localStorage.setItem('messageUsage', JSON.stringify(newUsage));
}

export function resetToFreeTier(): void {
  const usage = getMessageUsage();
  const newUsage = {
    ...usage,
    isPro: false
  };
  
  localStorage.setItem('messageUsage', JSON.stringify(newUsage));
}
