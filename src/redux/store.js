import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import * as rootReducer from './reducers/_root.reducer';

const middlewareList = process.env.NODE_ENV === 'development' ?
  [logger] :
  [];

const store = createStore(
    // tells the saga middleware to use the rootReducer
    // rootSaga contains all of our other reducers
    combineReducers({
        ...rootReducer,
    }),
    // adds all middleware to our project including saga and logger
    applyMiddleware(...middlewareList),
);

export default store;