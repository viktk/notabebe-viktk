import { connect } from 'react-redux';
import Header from 'src/components/Header';
import { logout, homeInitial } from 'src/store/actions/authActions';

// transforme le state en props
const mapStateToProps = (state) => ({
  // loggedMessage: `Bonjour ${state.pseudo}`,
  roleId: state.user.role_id,
  userId: state.user.user_id,
  logged: state.user.logged,
  loading: state.auth.loading,
});

// transforme la fonction dispatch en props
const mapDispatchToProps = (dispatch) => ({
  // handleLogout: () => {
  //   dispatch({ type: 'LOGOUT' });
  // },
  handleLogout: () => {
    dispatch(logout());
  },
  welcomePage: () => {
    dispatch(homeInitial());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
