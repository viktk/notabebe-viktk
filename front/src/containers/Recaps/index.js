import { connect } from 'react-redux';
import Recaps from 'src/components/Recaps';
import { fetchRecaps, filterRecaps } from 'src/store/actions/recap';
import { fetchChildren } from 'src/store/actions/children';
import { findUser } from 'src/store/selectors/user';


const mapStateToProps = (state, ownProps) => ({
  loading: state.recap.loading,
  recaps: state.recap.list,
  inputValue: state.recap.inputValue,
  children: state.children.list,
  
});

const mapDispatchToProps = (dispatch) => ({
  loadRecaps: () => {
    dispatch(fetchRecaps());
  },

  loadChildren: () => {
    dispatch(fetchChildren());
  },

  onInputValueRecapChange: (filterInputValue) => {
    dispatch(filterRecaps(filterInputValue));
  },  

});

export default connect(mapStateToProps, mapDispatchToProps)(Recaps);
