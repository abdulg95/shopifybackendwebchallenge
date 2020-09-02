import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import photosReducer from '../reducers/photos';
import errorsReducer from '../reducers/errors';
import searchReducer from '../reducers/search';
import authReducer from '../reducers/auth';

import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    photos: photosReducer,
    errors: errorsReducer,
    search: searchReducer,
    auth: authReducer
  }),
  composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => {
  console.log(store.getState());
});

export default store;