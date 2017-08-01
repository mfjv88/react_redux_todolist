import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { toggleTodo } from '../action/action_creators';
import { getVisibleTodos } from '../reducers';
import TodoList from './TodoList';

// VISIBLETODOLIST COMPONENT
const mapStateToTodoListProps = (state, { params }) => ({
    todos: getVisibleTodos( state.todos, params.filter || 'all' ),
});

const VisibleTodoList = withRouter(connect(
  mapStateToTodoListProps,
  { onTodoClick: toggleTodo }
)(TodoList));

export default VisibleTodoList;
