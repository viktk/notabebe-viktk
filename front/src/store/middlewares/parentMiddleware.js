import api from './utils/api';

import { tokenHeaderMiddleware as authHeader } from './tokenHeaderMiddleware';

const parentMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_PARENT: {
      const tokenPresent = localStorage.getItem('MyToken');

      const state = store.getState();

      api({
        method: 'GET',
        url: `/profile/parent/${id}`,
        headers: {
          authorization: `Bearer ${tokenPresent}`,
        },
      })
        .then((response) => {
          console.log('GET PARENT', response.data);
        })
        .catch((error) => console.log(error));
    }
      break;

    default:
      next(action);
  }
};

export default parentMiddleware;
