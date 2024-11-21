export function getTokenFromSession() {
  const token = sessionStorage.getItem('token');
  return token;
}
