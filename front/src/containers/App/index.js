import { connect } from 'react-redux';
import { homeInitial, checkToken } from 'src/store/actions/authActions';
import { fetchUsersParents } from 'src/store/actions';
import { fetchChildren } from 'src/store/actions/children'

// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
import { findUser } from 'src/store/selectors/user';

import App from 'src/components/App';

const mapStateToProps = (state, ownProps) => ({
  loading: state.auth.loading,
  user: state.auth,

  // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
  children: state.children.list,
  //child: findUser(state.children.list, ownProps.match.params.child_id),

  //user: findUser(state.user.list, ownProps.match.params.id),
  //user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  welcomePage: () => {
    dispatch(homeInitial());
  },
  checkIsLogged: () => {
    dispatch(checkToken());
  },
  // loadChildren: () => {
  //   dispatch(fetchChildren());
  // },
  // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
  // loadUsersParents: () => {
  //   dispatch(fetchUsersParents());
  // },

});

export default connect(mapStateToProps, mapDispatchToProps)(App);
