import { combineReducers } from 'redux';
import movies from './movies.reducer';
import colorgen from './colorgen.reducer';
import fruits from './fruits.reducer';

const rootReducer = combineReducers({
    fruits,
    movies,
    colorgen,
});

export default rootReducer;
