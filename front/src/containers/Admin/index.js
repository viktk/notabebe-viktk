import { connect } from 'react-redux';
import Admin from 'src/components/Admin';

import {
  getAllUsersAction,
  openModalDeleteUser,
  closeModalDeleteUser,
  deleteUser,
  AdminAddUser,
  resetFormAdmin,
} from 'src/store/actions';
import { checkToken } from 'src/store/actions/authActions';

const mapStateToProps = (state) => ({
  // loading: state.admin.loading,
  // userAPI: state.admin.userList,
  // userAPI: state.admin.userList,
  // searchValue: state.auth.searchValue,
  // successMessage: state.auth.successMessage,
  // user: state.auth,

  loading: state.admin.loading,
  isSearchActive: state.admin.isSearchActive,
  foundUsers: state.admin.foundUsers,
  dataUserList: state.admin.dataUserList,
  // userAPI: state.admin.dataUserList,

  users: state.admin.users,
  error: state.admin.error,
  FormDeleteOpen: state.admin.FormDeleteOpen,
  userDeleteId: state.admin.userDeleteId,
  deletedUserSuccess: state.admin.deletedUserSuccess,
  deletedUserError: state.admin.deletedUserError,
});

const mapDispatchToProps = (dispatch) => ({

  getAllUsers: () => {
    dispatch(getAllUsersAction());
  },

  onClickOpenFormDeleteUser: (userDeleteId) => {
    dispatch(openModalDeleteUser(userDeleteId));
  },

  onClickCloseFormDeleteUser: (userDeleteId) => {
    dispatch(closeModalDeleteUser(userDeleteId));
  },

  deleteUser: (userDeleteId) => {
    dispatch(deleteUser(userDeleteId));
  },

  handleAddUser: () => {
    dispatch(AdminAddUser());
  },
  resetFormAdmin: () => {
    dispatch(resetFormAdmin());
  },
  checkIsLogged: () => {
    dispatch(checkToken());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
