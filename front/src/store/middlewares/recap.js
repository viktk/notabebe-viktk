import { 
  FETCH_RECAPS, 
  saveRecaps,
  CREATE_RECAP,
  saveRecap 
} from 'src/store/actions/recap';

import axios from 'axios';
import api from './utils/api';

const recap = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_RECAPS: {
      const fetchData = async () => {
        try {
          const response = await api.get('profile/staff/allrecaps');
          const actionsaveRecaps = saveRecaps(response.data);
          store.dispatch(actionsaveRecaps);
        }
        catch (error) {
          console.error('il y a eu une erreur', error);
        }
      };

      fetchData();
      break;
    }
    case CREATE_RECAP: {
      const state = store.getState();
      const childId = action.child_id;

      const naps = [] 

      const nap = state.recap.napFormList.map(form => {
        naps.push({
          start_time: state['recap'][`start_time_${form.id}`],
          end_time: state['recap'][`end_time_${form.id}`],
          comment: state['recap'][`comment_nap_${form.id}`],
        })
      })

     axios.post(`https://notabebe-backend.herokuapp.com/profile/staff/child/recap`, 
     {
      child_id: childId,
      date: state.recap.date,
      mood: state.recap.mood,
      naps: naps,
      meals:  [{
        time: state.recap.time,
        comment: state.recap.comment_meal
      }],
      extra_info: state.recap.others
     })
       .then((response) => {
         const actionsaveRecap = saveRecap(response.data);
         store.dispatch(actionsaveRecap);
       })
       .catch((error) => {
         console.error('il y a eu une erreur dans le post comment', error);
         // store.dispatch(postCommentError());
       });
     break;
   }

    default:
      next(action);
  };
};

export default recap;


