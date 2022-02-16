import { connect } from 'react-redux';
import CreateRecap from 'src/components/CreateRecap';
import { changeValueText, changeMood, changeTimeNap, submitFormCreateRecap, changeDate, addFieldNap, removeFieldNap, createRecapToFalse } from 'src/store/actions/recap';
import { fetchChildren } from 'src/store/actions/children'


const mapStateToProps = (state, ownProps) => ({
  napFormLimit: state.recap.napFormLimit,
  napFormList: state.recap.napFormList,
  isOpen: state.recap.isOpen,
  //value: state.recap[ownProps.name],
  save: state.recap.save,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  submitCreateRecap: (child_id) => {
    dispatch(submitFormCreateRecap(child_id));
  },
  
  addNewNap: () => {
    dispatch(addFieldNap());
  },
  
  removeLastNap: () => {
    dispatch(removeFieldNap());
  },

  onChangeValue: (value, name) => {
    dispatch(changeValueText(name, value));
  },

  moodSelected: (value, name) => {
    dispatch(changeMood(name, value));
  },

  timeNapSelected: (value, name) => {
    dispatch(changeTimeNap(name, value));
  },

  createRecapFalse: () => {
    dispatch(createRecapToFalse())
  },

  dateSelected: (date, name) => {
    dispatch(changeDate(date, name));
  },
  loadChildren: () => {
    dispatch(fetchChildren());
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(CreateRecap);
