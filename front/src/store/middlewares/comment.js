import { 
  FETCH_COMMENTS, 
  saveComments,
  POST_COMMENT,
  saveComment,
  UPDATE_COMMENT,
  commentUpdated,
  DELETE_COMMENT, 
  commentDeleted,
} from 'src/store/actions/comment';

import axios from 'axios';
import api from './utils/api';

const comment = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_COMMENTS: {
      const fetchData = async () => {
        try {
          const response = await api.get('profile/staff/comments');
          const actionsaveComments = saveComments(response.data);
          store.dispatch(actionsaveComments);
        }
        catch (error) {
          console.error('il y a eu une erreur', error);
        }
      };

      fetchData();
      break;
    }
    case POST_COMMENT: {
      const state = store.getState();
      const parentId = action.parentId;
      const childId = action.childId;

     axios.post(`https://notabebe-backend.herokuapp.com/profile/parent/${parentId}/child/${childId}/comments`, {
       message: state.comment.comment,
       child_id: action.childId,
     })
       .then((response) => {
         const actionsaveComment = saveComment(response.data);
         store.dispatch(actionsaveComment);
       })
       .catch((error) => {
         console.error('il y a eu une erreur dans le post comment', error);
         // store.dispatch(postCommentError());
       });
     break;
   }
   case UPDATE_COMMENT: {
    const state = store.getState();
    const parentId = action.parentId;
    const childId = action.childId;
    const commentId = action.commentId;

   axios.patch(`https://notabebe-backend.herokuapp.com/profile/parent/${parentId}/child/${childId}/comments/${commentId}`, {
     message: state.comment.comment,
     commentId: action.commentId,
     child_id: action.childId,
   })
     .then((response) => {
       const actionupdateComment = commentUpdated(response.data);
       store.dispatch(actionupdateComment);
     })
     .catch((error) => {
       console.error('il y a eu une erreur dans l\'update du commentaire', error);
       // store.dispatch(postCommentError());
     });
   break;
 }
 case DELETE_COMMENT: {
  const state = store.getState();
  const parentId = action.parentId;
  const childId = action.childId;
  const commentId = action.commentId;

 axios.delete(`https://notabebe-backend.herokuapp.com/profile/parent/${parentId}/child/${childId}/comments/${commentId}`, {
   commentId: action.commentId,
   child_id: action.childId,
 })
   .then((response) => {
     const actiondeleteComment = commentDeleted(commentId);
     store.dispatch(actiondeleteComment);
   })
   .catch((error) => {
     console.error('il y a eu une erreur dans la suppression du commentaire', error);
     // store.dispatch(postCommentError());
   });
 break;
}

    default:
      next(action);
};
}

export default comment;
