import { combineReducers } from 'redux';

import authReducer from './authentification';
import adminReducer from './admin';
import userReducer from './user';
import childrenReducer from './children';
import recapReducer from './recap';
import commentReducer from './comment';
import staffReducer from './staff';

const rootReducer = combineReducers({
  auth: authReducer,
  admin: adminReducer,
  user: userReducer,
  children: childrenReducer,
  recap: recapReducer,
  comment: commentReducer,
  staff: staffReducer,
  
});

export default rootReducer;
