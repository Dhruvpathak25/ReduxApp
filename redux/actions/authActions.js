export const SIGN_UP = 'SIGN_UP';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const signUp = newUser => ({
  type: SIGN_UP,
  payload: newUser,
});

export const login = matchedUser => ({
  type: LOGIN,
  payload: matchedUser,
});

export const logout = () => ({
  type: LOGOUT,
});
