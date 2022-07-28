export const LOGIN_USER = 'LOGIN_USER';
export const TEMP = 'TEMP';

export const LoginUser = (email) => ({
  type: LOGIN_USER,
  email,
});
