import { connect } from 'react-redux';
import AddUserAdmin from 'src/components/Admin/AddUserAdmin';

import {
  AdminAddUser,
  changeFieldValueAdminAddUser,
  resetFormAdmin,
  changeRole,
} from 'src/store/actions';

const mapStateToProps = (state) => ({
  lastName: state.user.last_name,
  firstName: state.user.first_name,
  email: state.user.email,
  phoneNumber: state.user.phone_number,
  address: state.user.address,
  postcode: state.user.postcode,
  city: state.user.city,
  password: state.user.password,
  roleId: state.user.role_id,

  contentAdminPageAdd: state.user.contentAdminPageAdd,
  addUserSuccess: state.user.addUserSuccess,
  addUserError: state.user.addUserError,
});

const mapDispatchToProps = (dispatch) => ({

  handleAddUser: (userAdmin) => {
    dispatch(AdminAddUser(userAdmin));
  },
  changeField: (value, key) => {
    dispatch(changeFieldValueAdminAddUser(value, key));
  },
  resetFormAdmin: () => {
    dispatch(resetFormAdmin());
  },
  roleSelected: (value, name) => {
    dispatch(changeRole(name, value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddUserAdmin);
