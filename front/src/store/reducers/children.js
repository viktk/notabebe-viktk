import {
 SAVE_CHILDREN,
} from 'src/store/actions/children'

const initialState = {
  loading: true,
  list: [],  
};

const reducer = (state = initialState, action ={} ) => {
  switch (action.type) {
      case SAVE_CHILDREN: {
       return {
         ...state,
         list: action.payload,
         loading: false,
       };
     }
    default:
      return state;
  }
  
};

export default reducer;
