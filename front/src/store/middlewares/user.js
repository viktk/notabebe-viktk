import {
  CHANGE_INFOS,
  CHANGE_CHILD_INFOS,
  CHANGE_PASSWORD,
  saveInfosUser,
  savePasswordUser,
  changeInfosError,
  changePasswordError,
  saveUsersParents,
  FETCH_USERS_PARENTS,
  saveNewPasswordParent,
  FETCH_USERS_STAFF,
  saveUsersStaff,
} from 'src/store/actions';
import axios from 'axios';

import api from './utils/api';

const user = (store) => (next) => (action) => {
  // une fois qu'on aura les infos, on va les stocker dans le state => dispatcher une action
  switch (action.type) {
    case FETCH_USERS_PARENTS: {
      const fetchData = async () => {
        try {
          const response = await api.get('/profile/admin/parents');
          const actionsaveUsersParents = saveUsersParents(response.data);
          store.dispatch(actionsaveUsersParents);
        }
        catch (error) {
          console.error('il y a eu une erreur', error);
        }
      };

      fetchData();
      break;
    }
    case FETCH_USERS_STAFF: {
      const fetchData = async () => {
        try {
          const response = await api.get('/profile/admin/allstaff');
          const actionsaveUsersStaff = saveUsersStaff(response.data);
          store.dispatch(actionsaveUsersStaff);
        }
        catch (error) {
          console.error('il y a eu une erreur', error);
        }
      };

      fetchData();
      break;
    }

    case CHANGE_INFOS: {
      const state = store.getState();
      const id = action.id;

      axios.patch(`https://notabebe-backend.herokuapp.com/profile/parent/${id}`, {
        address: state.user.address,
        postcode: state.user.postcode,
        city: state.user.city,
        phone_number: state.user.phone_number,
      })
        .then((response) => {
          const actionSaveInfosUser = saveInfosUser(response.data);
          store.dispatch(actionSaveInfosUser);
        })
        .catch((error) => {
          // store.dispatch(changeInfosError());
        });
      break;
    }

    case CHANGE_CHILD_INFOS: {
      const state = store.getState();
      const parentId = action.parentId;
      const childId = action.childId;


      axios.patch(`https://notabebe-backend.herokuapp.com/profile/parent/${parentId}/child/${childId}`, {
        allergies: state.user.allergy,
      })
        .then((response) => {
          const actionSaveInfosUser = saveInfosUser(response.data);
          store.dispatch(actionSaveInfosUser);
        })
        .catch((error) => {
           console.error('une erreur s\'est produite')
          // store.dispatch(changeInfosError());
        });
      break;
    }
    case CHANGE_PASSWORD: {
      const state = store.getState();
      const id = action.id;

      axios.patch(`https://notabebe-backend.herokuapp.com/profile/parent/${id}/password`, {
        oldPassword: state.user.oldpassword,
        password: state.user.newpassword,
        id: action.id,
      })
        .then((response) => {
          const actionsChangePasswordParent = saveNewPasswordParent(response.data);
          store.dispatch(actionsChangePasswordParent);
        })
        .catch((error) => {
          ('il y a eu une erreur dans le save password parent', error);
          // store.dispatch(changeInfosError());
        });
      break;
    }


    default:
      next(action);
  }
};

export default user;
