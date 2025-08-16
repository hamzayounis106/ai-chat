"use client";

import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showSidebar = pathname?.startsWith('/chat');

  if (showSidebar) {
    return (
      <div className="flex gap-4 p-4 h-[calc(100vh-80px)]">
        <Sidebar />
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {children}
    </div>
  );
}
