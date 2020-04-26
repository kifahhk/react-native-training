import React from 'react';
import { View } from 'react-native';
import TodoItem from './todo-item';

const TodoList = ({ list }) => {
  console.log(list);
  return (
    <View>
      {list.map((listItem) => {
        return <TodoItem key={`todo-item-${listItem.id}-${listItem.title}`} listItem={listItem} />;
      })}
    </View>
  );
};

export default TodoList;
