import { connect } from 'react-redux';

import PrivateRoute from 'src/components/PrivateRoute';

const mapStateToProps = (state) => ({
  // isAuth: state.auth.logged,
  // isAuth: true,

});

export default connect(mapStateToProps)(PrivateRoute);
