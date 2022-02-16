import { connect } from 'react-redux';
import Field from 'src/components/Field';
import { changeFieldValue, changeFieldValueTwo } from 'src/store/actions';

// import { findUser } from 'src/store/selectors/user';

const mapStateToProps = (state, ownProps) => ({
  // value: state.user.name,
  value: state.user[ownProps.name],
  // value: findUser(state.user.list, ownProps.match.params.id)[ownProps.name],
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  // onChange: (value) => {
  //   const action = changeFieldValue(ownProps.name, value);
  //   dispatch(action);
  // },

  onChangeInputValue: (value) => {
    const action = changeFieldValueTwo(ownProps.name, value);
    dispatch(action);
  },

  // loadUsersParents: () => {
  //   dispatch(fetchUsersParents())
  //   },

});

export default connect(mapStateToProps, mapDispatchToProps)(Field);
