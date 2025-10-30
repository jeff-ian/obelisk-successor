// Check if user has already joined waitlist
export const hasJoinedWaitlist = () => {
  return localStorage.getItem('obelisk_waitlist_joined') === 'true';
};

export const markWaitlistJoined = (email = '') => {
  localStorage.setItem('obelisk_waitlist_joined', 'true');
  if (email) {
    localStorage.setItem('obelisk_waitlist_email', email);
  }
};

export const getWaitlistEmail = () => {
  return localStorage.getItem('obelisk_waitlist_email');
};
