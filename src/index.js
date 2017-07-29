import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { TodoApp } from './components/App';
import { todos, visibilityFilter } from './reducers/reducers';
import './assets/index.css';

const reducers = combineReducers({
  todos,
  visibilityFilter
});

ReactDOM.render(
    <Provider store={createStore(reducers)}>
      <TodoApp />
    </Provider>,
    document.getElementById('root')
);

// store.subscribe(render);
// render();
