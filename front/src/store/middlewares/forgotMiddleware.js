import {
  FORGOT, createForgotErrorAction,
} from 'src/store/actions/authActions';

import api from './utils/api';

const forgotMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case FORGOT: {

      const state = store.getState();
      // const { user: { email, password } } = store.getState();

      api({
        method: 'POST',
        url: '/login',
        data: {
          email: state.auth.email,
        },
      })
        .then((response) => {
          console.log('REPONSE DE FORGOT MIDDLEWARE', response);
        })
        .catch((error) => {
          store.dispatch(createForgotErrorAction());
        });
      break;
    }
    default:
      next(action);
  }
};

export default forgotMiddleware;
