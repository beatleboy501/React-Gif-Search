import { combineReducers } from 'redux';
import AuthReducer from './auth';
import GifsReducer from './gifs';
import ModalReducer from './modal';
import { routerReducer } from 'react-router-redux';
import { reducer as FormReducer } from 'redux-form';

// This combines the reducers we've separated or imported for better organization.
// Reducers do not mutate state, they simply take a previous state and an action to perform on it.
// They then return a totally new state object
const rootReducer = combineReducers({
  auth: AuthReducer,
  form: FormReducer,
  gifs: GifsReducer,
  modal: ModalReducer,
  router: routerReducer
});

export default rootReducer;
