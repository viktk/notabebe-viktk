import { connect } from 'react-redux';
import Home from 'src/components/Home';
import { changeFieldValueLogin, login, checkToken } from 'src/store/actions/authActions';

// transforme le state en props
const mapStateToProps = (state) => ({
  errorMessage: state.auth.errorMessage,
  contentHome: state.auth.contentHome,
  successMessage: state.auth.successMessage,
  user: state.auth,
  token: state.auth.token,
});

// transforme la fonction dispatch en props
const mapDispatchToProps = (dispatch) => ({
  // changeField: (value, key) => {
  //   dispatch(changeFieldValueLogin(value, key));
  // },
  handleLogin: () => {
    dispatch(login());
  },
  checkIsLogged: () => {
    dispatch(checkToken());
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
