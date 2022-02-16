import {
  LOGIN,
  saveUser,
  createLoginErrorAction,
  CHECK_TOKEN,
  saveToken,
  checkTokeError,
} from 'src/store/actions/authActions';

import jwtDecode from 'jwt-decode';

import api from './utils/api';

const authMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case LOGIN: {
      const state = store.getState();

      api({
        method: 'POST',
        url: '/login',
        data: { email: state.user.email, password: state.user.password },
      })
        .then((response) => {
          // ici on vient stocker le token dans localStorage
          localStorage.setItem('MyToken', response.data.token);
          const userData = response.data.token;

          const myToken = response.data.token;
          const myTokenDecoded = jwtDecode(myToken);

          // on en profite pour venir le stoker aussi dans l'instance d'axios
          // comme ça on l'aura à chaque requête !!
          api.defaults.headers.common.authorization = `Bearer ${response.data.token}`;

          // ici on veut stocker dans le state les infos du user
          // donc on va faire un dispatch d'action
          // on passe par la fonction dispatch du store
          store.dispatch(saveUser(myTokenDecoded));
        })
        .catch((error) => {
          store.dispatch(createLoginErrorAction());
        });
      break;
    }
    case CHECK_TOKEN: {
      // on récupère le token stocké dans le localStorage
      const tokenLocal = localStorage.getItem('MyToken');

      if (tokenLocal && jwtDecode(tokenLocal).exp < Date.now() / 1000) {
        next(action);
        localStorage.clear();
        store.dispatch(checkTokeError());
      }
      else if (!tokenLocal) {
        console.log('IL N\'Y A PAS DE TOKEN');
      }
      else {
        const tokenLocalcheck = localStorage.getItem('MyToken');
        api.defaults.headers.common.authorization = `Bearer ${tokenLocalcheck}`;
        store.dispatch(saveToken(jwtDecode(tokenLocalcheck)));
      }
      next(action);
      break;
    }
    default:
      next(action);
  }
};

export default authMiddleware;
