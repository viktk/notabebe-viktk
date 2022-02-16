/* eslint-disable import/prefer-default-export */

// selecteur perso qui renvoi ce qu'on veut, ici un null
export const isUserLogged = (state) => state.pseudo !== null;
