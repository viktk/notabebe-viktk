import { connect } from 'react-redux';
import ForgotPassword from 'src/components/ForgotPassword';
import { changeFieldValueForgot, forgot } from 'src/store/actions/authActions';

// transforme le state en props
const mapStateToProps = (state) => ({
  emailForgot: state.auth.emailForgot,
  errorMessage: state.auth.isError,
  messageForgot: state.auth.messageForgot,
  successMessage: state.auth.successMessage,
  loading: state.auth.loading,
});

// transforme la fonction dispatch en props
const mapDispatchToProps = (dispatch) => ({
  changezzzzz: (value, key) => {
    dispatch(changeFieldValueForgot(value, key));
  },
  handleForgot: () => {
    dispatch(forgot());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
