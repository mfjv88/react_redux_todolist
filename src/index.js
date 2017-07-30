import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { TodoApp } from './components/App';
import todoApp_r from './reducers/index';
import { loadState, saveState } from './localStorage';
import throttle from 'lodash/throttle';
import './assets/index.css';

const persistedState = loadState();
const store = createStore(
  todoApp_r,
  persistedState
);

store.subscribe(throttle(() => {
  saveState({
    todos: store.getState().todos
  });
}, 1000));

ReactDOM.render(
    <Provider store={store}>
      <TodoApp />
    </Provider>,
    document.getElementById('root')
);

// store.subscribe(render);
// render();
