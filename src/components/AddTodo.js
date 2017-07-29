import React from 'react';
import { connect } from 'react-redux';
import addTodo from '../action/action_creators';

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
export default AddTodo = connect()(AddTodo);