import { connect } from 'react-redux';
import ChildRecap from 'src/components/ChildRecap';
import {} from 'src/store/actions';

import { fetchRecaps } from 'src/store/actions/recap'
import { fetchChildren } from 'src/store/actions/children';
import { findUser } from 'src/store/selectors/user';
import { findRecap } from 'src/store/selectors/recap';
import { fetchUsersParents} from 'src/store/actions';
import { commentSendNo } from 'src/store/actions/comment'


const mapStateToProps = (state, ownProps) => ({
  parent: findUser(state.user.list, ownProps.match.params.parent_id),
  child: findUser(state.children.list, ownProps.match.params.child_id),
  loading: state.recap.loading,
  recap: findRecap(state.recap.list, ownProps.match.params.child_id),
});

const mapDispatchToProps = (dispatch,) => ({
  loadRecaps: () => {
    dispatch(fetchRecaps());
  },
  loadChildren: () => {
    dispatch(fetchChildren());
  },
  loadParents: () => {
    dispatch(fetchUsersParents());
  },
  closeCommentSend: () => {
    dispatch(commentSendNo());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ChildRecap);
