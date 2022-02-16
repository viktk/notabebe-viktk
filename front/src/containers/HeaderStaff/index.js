import { connect } from 'react-redux';
import HeaderStaff from 'src/components/StaffProfile/HeaderStaff';
import { logout } from 'src/store/actions/authActions';

// transforme le state en props
const mapStateToProps = (state) => ({
  userId: state.auth.userId,
});

// transforme la fonction dispatch en props
const mapDispatchToProps = (dispatch) => ({
  handleLogout: () => {
    dispatch(logout());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderStaff);
