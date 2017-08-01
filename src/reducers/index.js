import { combineReducers } from 'redux';
import todos, * as fromTodos from './todos';
import visibilityFilter from './visibilityFilter';

const todoApp_r = combineReducers({
  todos,
  visibilityFilter
});

export default todoApp_r;

export const getVisibleTodos = (state, filter) =>
  fromTodos.getVisibleTodos(state.todos, filter);
