"use client";

export function isClientAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Check if we have an auth token cookie
  const cookies = document.cookie.split(';');
  const authCookie = cookies.find(cookie => 
    cookie.trim().startsWith('auth-token=')
  );
  
  return !!authCookie && authCookie.split('=')[1].trim() !== '';
}

export function getUserFromToken() {
  if (typeof window === 'undefined') return null;
  
  try {
    const cookies = document.cookie.split(';');
    const authCookie = cookies.find(cookie => 
      cookie.trim().startsWith('auth-token=')
    );
    
    if (!authCookie) return null;
    
    const token = authCookie.split('=')[1].trim();
    if (!token) return null;
    
    // Decode JWT payload (this is just for display, not for security)
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch (error) {
    return null;
  }
}
