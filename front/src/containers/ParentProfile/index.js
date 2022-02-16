import { connect } from 'react-redux';
import ParentProfile from 'src/components/ParentProfile';
import {
  openChangeInfos,
  changeInfos,
  toggleChangePassword,
  closeFormAction,
  changePassword,
  saveParent,
  fetchUsersParents,
} from 'src/store/actions';


import { findUser, findChildrenOfParent } from 'src/store/selectors/user';

const mapStateToProps = (state, ownProps) => ({
  oldpassword: state.user.oldpassword,
  isOpenInfos: state.user.isOpenInfos,
  isOpenPassword: state.user.isOpenPassword,
  newpassword: state.user.newpassword,
  confirmpassword: state.user.confirmpassword,
  value: state[ownProps.name],
  changeInfos: state.user.changeInfos,
  hasInfosError: state.user.changeInfosError,
  hasPasswordError: state.user.changePasswordError,
  user: findUser(state.user.list, ownProps.match.params.parent_id),
  children: findChildrenOfParent(state.user.list, ownProps.match.params.parent_id),
  loading: state.user.loading,
});


const mapDispatchToProps = (dispatch) => ({

  loadUsersParents: () => {
    dispatch(fetchUsersParents());
  },

  openUserInfos: () => {
    dispatch(openChangeInfos());
  },

  handleChangeInfos: (id) => {
    dispatch(changeInfos(id));
  },

  togglerChangePassword: () => {
    dispatch(toggleChangePassword());
  },

  closeForm: () => {
    dispatch(closeFormAction());
  },

  handleChangePassword: (id) => {
    dispatch(changePassword(id));
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(ParentProfile);
