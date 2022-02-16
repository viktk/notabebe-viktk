import { connect } from 'react-redux';
import Login from 'src/components/Login';
import { isUserLogged } from 'src/store/selectors/loggedPseudo';

const mapStateToProps = (state) => ({
  emailValue: state.login.email,
  passwordValue: state.login.password,
  isLogged: isUserLogged(state),
  isError: state.isError,
});

const mapDispatchToProps = (dispatch) => ({
  onEmailChange: (e) => {
    dispatch({
      type: 'SET_SETTINGS_FIELD_VALUE',
      newValue: e.target.value,
      fieldKey: 'email',
    });
  },
  onPasswordChange: (e) => {
    dispatch({
      type: 'SET_SETTINGS_FIELD_VALUE',
      newValue: e.target.value,
      fieldKey: 'password',
    });
  },
  onSettingsSubmit: (e) => {
    e.preventDefault();
    dispatch({
      type: 'SUBMIT_LOGIN',
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
