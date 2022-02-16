import { connect } from 'react-redux';
import HeaderAdmin from 'src/components/Admin/HeaderAdmin';
import { logout } from 'src/store/actions/authActions';

// transforme le state en props
const mapStateToProps = (state) => ({
  logged: state.auth.logged,
  // loggedMessage: `Bonjour ${state.pseudo}`,
  successMessage: state.auth.successMessage,
  user: state.auth,
});

// transforme la fonction dispatch en props
const mapDispatchToProps = (dispatch) => ({
  // handleLogout: () => {
  //   dispatch({ type: 'LOGOUT' });
  // },
  handleLogout: () => {
    dispatch(logout());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderAdmin);
