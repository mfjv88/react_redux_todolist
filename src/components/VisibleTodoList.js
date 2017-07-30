import React from 'react';
import { connect } from 'react-redux';
import toggleTodo from '../action/action_creators';
// import toggleTodo from '../action/action_creators';

// VISIBLETODOLIST COMPONENT
const Todo = ({
  onClick,
  completed,
  text
}) => (
    <li
        onClick={onClick}
        style={{
          textDecoration:
            completed ?
              'line-through' :
              'none'
        }}>
        {text}
      </li>
);

const TodoList = ({
  todos,
  onTodoClick
}) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
      />
    )}
  </ul>
);

const getVisibleTodos = (
  todos,
  filter
) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(
        t => t.completed
      );
    case 'SHOW_ACTIVE':
      return todos.filter(
        t => !t.completed
      );
    default:
      return todos;
  }
};


const mapStateToTodoListProps = (state) => ({
    todos: getVisibleTodos(
      state.todos,
      state.visibilityFilter
    ),
});

const mapDispatchToTodoListProps = (dispatch) => ({
    onTodoClick(id) {
      dispatch(toggleTodo(id))
    },
});
const VisibleTodoList = connect(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps,
)(TodoList);

export default VisibleTodoList;
