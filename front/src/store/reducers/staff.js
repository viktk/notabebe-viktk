import {
  SAVE_NEW_PASSWORD_STAFF,
  CLEAR_CHANGE_PASSWORD_CONFIRM_MESSAGE,

} from 'src/store/actions/staff'

const initialState = {
  changePasswordConfirmMessage: '',
  changePasswordError: false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_NEW_PASSWORD_STAFF: {
      return {
        ...state,
        changePasswordConfirmMessage: 'Le mot de passe a bien été modifié',
        changePasswordError: false,
      };
    }
    case CLEAR_CHANGE_PASSWORD_CONFIRM_MESSAGE: {
      return {
        ...state,
        changePasswordConfirmMessage: '',
      }
    }
    default:
      return state;
  }

};

export default reducer;
