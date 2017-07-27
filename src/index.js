import React from 'react';
import ReactDOM from 'react-dom';
import Redux, { createStore } from 'redux';
import { store, TodoApp } from './components/App';
import './assets/index.css';

// const { createStore } = Redux;
// const store = createStore(todoApp);

const render = () => {
  ReactDOM.render(
    <TodoApp
      {...store.getState()}
    />,
    document.getElementById('root')
  );
};

store.subscribe(render);
render();
