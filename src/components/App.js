import React from 'react';
import AddTodo from './AddTodo';
import VisibleTodoList from './VisibleTodoList';
import Footer from './Footer';
// import logo from '../assets/logo.svg';
import '../assets/App.css';

// TODOAPP COMPONENT
const TodoApp = ({ filter }) => (
    <div>
      <AddTodo />
      <VisibleTodoList />
      <Footer />
    </div>
  );

export default TodoApp;
