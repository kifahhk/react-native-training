import * as WebBrowser from 'expo-web-browser';
import React, { useState, useContext } from 'react';
import { ThemeProvider, Icon, Input } from 'react-native-elements';
import TodoList from '../components/todo-list';
import { StyleSheet } from 'react-native';
import GlobalState from '../state';

const ListScreen = () => {
  const [ text, setText ] = useState('');
  const { state, actions } = useContext(GlobalState.Context);

  const addNewTodo = () => {
    const [ id, title ] = [ `${Math.round(Math.random() * new Date().getTime())}`, text ];
    actions.addTodo({ title, id });
    clearText();
  };

  const clearText = () => {
    setText('');
  };

  const handleKeyPress = (e) => {
    if(e.key === 'Enter') { // todo: this is for Web, test on mobile device
      addNewTodo();
    }
  }

  return (
      <ThemeProvider>
        <Input
          rightIcon={<Icon
            name='add'
            type='ion-icon'
            color='#517fa4'
          />}
          onChangeText={setText}
          onKeyPress={handleKeyPress}
          containerStyle={styles.inputStyle}
          style={styles.inputStyle}
          value={text}
        />
        <TodoList list={state.todos} />
      </ThemeProvider>
  );
};

export default ListScreen;

ListScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  inputStyle: {
    backgroundColor: '#ededed'
  }
});
