export const getUserData = () => {
  const currentUser = window.localStorage.getItem('user');

  return JSON.parse(currentUser);
};
