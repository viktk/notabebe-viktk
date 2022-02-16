export const FETCH_COMMENTS = 'FETCH_COMMENTS';
export const SAVE_COMMENTS = 'SAVE_COMMENTS';
export const OPEN_MODAL ='OPEN_MODAL';
export const POST_COMMENT ='POST_COMMENT';
export const SAVE_COMMENT ='SAVE_COMMENT';
export const CHANGE_TEXT_VALUE = 'CHANGE_TEXT_VALUE';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const COMMENT_UPDATED = 'COMMENT_UPDATED';
export const OPEN_FORM_DELETE_COMMENT = 'OPEN_FORM_DELETE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const COMMENT_DELETED = 'COMMENT_DELETED';
export const FILTER_COMMENTS = 'FILTER_COMMENTS';
export const COMMENT_SEND_NO = 'COMMENT_SEND_NO';

export const fetchComments = () => ({
  type: FETCH_COMMENTS,
})

export const saveComments = (comments) => ({
  type: SAVE_COMMENTS,
  payload: comments,
});

export const openModal = (commentId) => ({
  type: OPEN_MODAL,
  commentId,
})

export const postComment = (parentId, childId) => ({
  type: POST_COMMENT,
  parentId,
  childId,
});

export const saveComment = (comment) => ({
  type: SAVE_COMMENT,
  payload: comment,
});


export const changeTextValue = (value) => ({
  type: CHANGE_TEXT_VALUE,
  value,
});

export const updateComment = (parentId, childId, commentId) => ({
  type: UPDATE_COMMENT,
  parentId,
  childId,
  commentId,
});

export const commentUpdated = () => ({
  type: COMMENT_UPDATED,
});

export const openFormDeleteComment = (commentId) => ({
  type: OPEN_FORM_DELETE_COMMENT,
  commentId,
});

export const deleteComment = (parentId, childId, commentId) => ({
  type: DELETE_COMMENT,
  parentId,
  childId,
  commentId,
});

export const commentDeleted = (commentId) => ({
  type: COMMENT_DELETED,
  commentId,
});

export const filterComments = (filterInputValue) => ({
  type: FILTER_COMMENTS,
  filterInputValue,
});

export const commentSendNo = () => ({
  type: COMMENT_SEND_NO,
})
