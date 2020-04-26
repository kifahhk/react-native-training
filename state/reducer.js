import { ADD_TODO } from './constants';

export default (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      console.log(state, action);
      return { ...state, todos: [ ...state.todos, action.data ] };
    default:
      return state;
  }
};
