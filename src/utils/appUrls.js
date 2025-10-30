// Determine the main app URL based on environment
export const getMainAppUrl = () => {
  // Development - points to local Next.js app
  if (import.meta.env.DEV) {
    return 'http://localhost:3000';
  }
  
  // Production - will point to your main domain
  // You'll update this when you deploy
  return 'https://obelisk.ai';
};

export const MAIN_APP_URL = getMainAppUrl();
