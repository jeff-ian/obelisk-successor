// Email hashing utility for privacy-safe analytics
export const hashEmail = async (email) => {
  // Normalize email
  const normalizedEmail = email.trim().toLowerCase();
  
  // Convert email to Uint8Array
  const encoder = new TextEncoder();
  const data = encoder.encode(normalizedEmail);
  
  // Hash using SHA-256
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  
  // Convert to hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
};

// Simple synchronous hash fallback (less secure but works if crypto.subtle unavailable)
export const hashEmailSync = (email) => {
  const normalizedEmail = email.trim().toLowerCase();
  let hash = 0;
  for (let i = 0; i < normalizedEmail.length; i++) {
    const char = normalizedEmail.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16);
};
