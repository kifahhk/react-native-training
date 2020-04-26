import { useReducer, useCallback } from 'react';
import reducer from './reducer';
import { ADD_TODO } from './constants';
import { mockTodos } from '../api/mockTodos';

export const defaultState = {
  todos: mockTodos,
};

export default (initialState = defaultState) => {
  const [ state, dispatch ] = useReducer(reducer, initialState);

  const addTodo = useCallback((data) => dispatch({ type: ADD_TODO, data }), []);

  return {
    state,
    actions: {
      addTodo,
    },
  };
};
