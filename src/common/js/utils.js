export const getRedirectPath = ({type, avatar}) => {
  let url = type === 'boss' ? '/dashboard/boss' : '/dashboard/worker';
  if (!avatar) {
    url = url.replace('/dashboard', '') + 'info';
  }
  return url;
};

export const getChatId = (userId, targetId) => {
  return [userId, targetId].sort().join('_');
};
