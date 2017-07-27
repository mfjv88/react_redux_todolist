import React, { Component } from 'react';
import Redux, { createStore, combineReducers } from 'redux';
import logo from '../assets/logo.svg';
import '../assets/App.css';

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case 'TOGGLE_TODO':
      if(state.id !== action.id){
        return state;
      }
      return {
        ...state,
        completed: !state.completed
      }
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
      return state.map(t =>
        todo(t, action)
    );
    default:
      return state;
  }
};

const visibilityFilter = (
  state = 'SHOW_ALL',
  action
) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

const Footer = ({
  visibilityFilter,
  onFilterClick
}) => (
  <p>
    Show:
    {' '}
    <FilterLink
      filter='SHOW_ALL'
      currentFiler={visibilityFilter}
      onClick={onFilterClick}
    >
      All
    </FilterLink>
    {' '}
    <FilterLink
      filter='SHOW_ACTIVE'
      currentFiler={visibilityFilter}
      onClick={onFilterClick}
    >
      Active
    </FilterLink>
    {' '}
    <FilterLink
      filter='SHOW_COMPLETED'
      currentFiler={visibilityFilter}
      onClick={onFilterClick}
    >
      Completed
    </FilterLink>
  </p>
);

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

const AddTodo = ({
  onAddClick
}) => {
  let input;
  return (
    <div>
      <input ref={node => {
        input = node;
      }}/>
      <button onClick={() => {
        onAddClick(input.value);
        input.value = '';
      // }}
      }}>
        Add Todo
      </button>
    </div>
  )
}


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
  }
}

let nextTodoId = 0;

const FilterLink = ({
  filter,
  currentFilter,
  children,
  onClick
}) => {
  if(filter === currentFilter){
    return <span>{children}</span>;
  }

  return(
    <a href='#'
      onClick={e => {
        e.preventDefault();
        onClick(filter);
      }}
    >
    {children}
  </a>
  );
}

const todoApp = combineReducers({
  todos,
  visibilityFilter
});
export const store = createStore(todoApp);

export const TodoApp = ({
  todos,
  visibilityFilter
}) => (
    <div>
      <AddTodo
        onAddClick={text =>
          store.dispatch({
            type: 'ADD_TODO',
            id: nextTodoId++,
            text
          })
        }
      />
      <TodoList
        todos={
          getVisibleTodos(
            todos,
            visibilityFilter
          )
        }
        onTodoClick={id =>
          store.dispatch({
            type: 'TOGGLE_TODO',
            id
          })
        }
      />
      <Footer
        visibilityFilter={visibilityFilter}
        onFilterClick={filter =>
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter
          })
        }
      />
    </div>
  );
// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h2>Welcome to React</h2>
//         </div>
//         <p className="App-intro">
//           To get started, edit <code>src/components/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

// export default App;
