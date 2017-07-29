import React from 'react';
import { connect } from 'react-redux';
// import logo from '../assets/logo.svg';
import '../assets/App.css';

// ACTION CREATORS
let nextTodoId = 0;
const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  };
};

const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  };
};

const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  };
};

// ADDTODO COMPONENT
let AddTodo = ({ dispatch }) => {
  let input;

  return (
    <div>
      <input ref={node => {
        input = node;
      }}/>
      <button onClick={() => {
        dispatch(addTodo(input.value));
        input.value = '';
      }}>
        Add Todo
      </button>
    </div>
  );
};
AddTodo = connect()(AddTodo);

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

const mapStateToTodoListProps = (state) => {
  return {
    todos: getVisibleTodos(
      state.todos,
      state.visibilityFilter
    )
  };
};
const mapDispatchToTodoListProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    }
  };
};
const VisibleTodoList = connect(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps,
)(TodoList);


// FOOTER COMPONENT
const Link = ({
  active,
  currentFilter,
  children,
  onClick
}) => {
  if(active){
    return <span>{children}</span>;
  }

  return(
    <a href='#'
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
    >
    {children}
  </a>
  );
};

const mapStateToLinkProps = (
  state,
  ownProps
) => {
  return {
    active :
      ownProps.filter ===
      state.visibilityFilter
  };
};

const mapDispatchToLinkProps = (
  dispatch,
  ownProps
) => {
  return {
    onClick: () =>{
      dispatch(setVisibilityFilter(ownProps.filter));
    }
  };
}

const FilterLink = connect(
  mapStateToLinkProps,
  mapDispatchToLinkProps
)(Link);

FilterLink.contextTypes = {
  store: React.PropTypes.object
};

const Footer = () => (
  <p>
    Show:
    {' '}
    <FilterLink
      filter='SHOW_ALL'
      >
      All
    </FilterLink>
    {' '}
    <FilterLink
      filter='SHOW_ACTIVE'
      >
      Active
    </FilterLink>
    {' '}
    <FilterLink
      filter='SHOW_COMPLETED'
      >
      Completed
    </FilterLink>
  </p>
);


// TODOAPP COMPONENT
export const TodoApp = () => (
    <div>
      <AddTodo />
      <VisibleTodoList />
      <Footer />
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
