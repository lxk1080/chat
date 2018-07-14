export const getRedirectPath = ({type, avatar}) => {
  let url = type === 'boss' ? '/boss' : '/worker';
  if (!avatar) {
    url += 'info';
  }
  return url;
};