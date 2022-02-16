import {
  ADD_FIELD_NAP,
  REMOVE_FIELD_NAP,
  CHANGE_VALUE_TEXT,
  CHANGE_MOOD,
  CHANGE_TIME_NAP,
  // CHANGE_TIME_NAP_START,
  // CHANGE_TIME_NAP_END,
  SAVE_RECAPS,
  CHANGE_DATE,
  SAVE_RECAP,
  FILTER_RECAPS,
  RECAP_TO_FALSE
} from 'src/store/actions/recap';



const initialState = {
  napFormLimit: 1,
  napFormList: [
    {
      id: 1,
      nameStartNap: `start_time_1`,
      nameEndNap: 'end_time_1',
      nameCommentNap: 'comment_nap_1'
    },
  ],
  save: false, 
  isOpen: false,
  loading: true,
  list: [],
  time: '12:00:00',
  comment_meal: 'un commentaire sur le miam',
  start_time: '',
  end_time: '',
  comment: '',
  naps: [],
  meals: [],


  date: '',
  mood: '',
  others:'',

  start_time_1: '',
  end_time_1: '',
  comment_nap_1: '',

  start_time_2: '',
  end_time_2: '',
  comment_nap_2: '',

  start_time_3: '',
  end_time_3: '',
  comment_nap_3: '',
  inputValue:'',
};





const reducer = (state = initialState, action ) => {
  switch (action.type) {
    case ADD_FIELD_NAP:{

      const newId = Math.max(...state.napFormList.map(form => form.id)) + 1

      const newNap = {
        id: newId,
        nameStartNap: `start_time_${newId}`,
        nameEndNap: `end_time_${newId}`,
        nameCommentNap: `comment_nap_${newId}`
      } 
      return {
        ...state,
        napFormList: [
          ...state.napFormList,
          newNap
        ],
        napFormLimit: state.napFormLimit + 1
      };
    }

    case REMOVE_FIELD_NAP:{

      const newFormList = [...state.napFormList]
      newFormList.pop()
      return {
        ...state,
        napFormList: [...newFormList],
        napFormLimit: state.napFormLimit - 1
      };
    }

    case CHANGE_VALUE_TEXT: {
      return {
        ...state,
        [action.key]: action.value,
      }; 
    }         
    case CHANGE_MOOD:
      return {
        ...state,
        [action.key]: action.value,
      }
      case CHANGE_TIME_NAP:
      return {
        ...state,
          [action.key]: action.value,
      }

      case SAVE_RECAPS: {
       return {
         ...state,
         list: action.payload,
         loading: false,
       };
     }
     case CHANGE_DATE: {
      return {
        ...state,
        [action.key]: action.value,
      }; 
    }
    case SAVE_RECAP: {
      return {
        ...state,
        recap: action.payload,
        save: true, 
        // date: '',
        // mood: '',
        // others:'',
        // start_time_1: '',
        // end_time_1: '',
        // comment_nap_1: '',
        // start_time_2: '',
        // end_time_2: '',
        // comment_nap_2: '',
        // start_time_3: '',
        // end_time_3: '',
        // comment_nap_3: '',
      }
    }
    case FILTER_RECAPS: {
      return {
        ...state,
        inputValue: action.filterInputValue
      }
    }
    case RECAP_TO_FALSE: {
      return {
        ...state,
        save: false,
      }
    }
    default:
      return state;
  }
};

export default reducer;
