import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';

const todoApp_r = combineReducers({
  todos,
  visibilityFilter
});

export default todoApp_r;
