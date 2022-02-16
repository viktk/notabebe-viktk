// actions AUTHENTIFICATION
export const HOME_INITIAL = 'HOME_INITIAL';
export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const CHECK_TOKEN = 'CHECK_TOKEN';
export const CHECK_TOKEN_SUCCESS = 'CHECK_TOKEN_SUCCESS';
export const FORGOT = 'FORGOT';
export const FORGOT_SUCCESS = 'FORGOT_SUCCESS';
export const FORGOT_ERROR = 'FORGOT_ERROR';
export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const CHANGE_FIELD_VALUE_LOGIN = 'CHANGE_FIELD_VALUE_LOGIN';
export const CHANGE_FIELD_VALUE_FORGOT = 'CHANGE_FIELD_VALUE_FORGOT';

export const login = () => ({ type: LOGIN });
export const createLoginSuccessAction = () => ({ type: LOGIN_SUCCESS });
export const createLoginErrorAction = () => ({ type: LOGIN_ERROR });
export const checkToken = () => ({ type: CHECK_TOKEN });
export const forgot = () => ({ type: FORGOT });
export const createForgotSuccessAction = () => ({ type: FORGOT_SUCCESS });
export const createForgotErrorAction = () => ({ type: FORGOT_ERROR });

export const logout = () => ({ type: LOGOUT });
export const createLogoutSuccessAction = () => ({ type: LOGOUT_SUCCESS });

export const changeFieldValueLogin = (value, key) => ({
  type: CHANGE_FIELD_VALUE_LOGIN,
  key,
  value,
});

export const changeFieldValueForgot = (value, key) => ({
  type: CHANGE_FIELD_VALUE_FORGOT,
  key,
  value,
});

export const SAVE_USER = 'SAVE_USER';
export const saveUser = (myTokenDecoded, payload) => ({
  type: SAVE_USER,
  myTokenDecoded,
  payload,
});

export const homeInitial = (myTokenDecoded, tokenLocal) => ({
  type: HOME_INITIAL,
  myTokenDecoded,
  tokenLocal,
});

export const saveToken = (tokenLocal) => ({
  type: CHECK_TOKEN_SUCCESS,
  tokenLocal,
});

export const CHECK_TOKEN_ERROR = 'CHECK_TOKEN_ERROR';
export const checkTokeError = () => ({
  type: CHECK_TOKEN_ERROR,
});
