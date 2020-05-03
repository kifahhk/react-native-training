import * as WebBrowser from 'expo-web-browser';
import React, { useState, useContext, useEffect } from 'react';
import { ThemeProvider, Icon, Input } from 'react-native-elements';
import TodoList from '../components/todo-list';
import { StyleSheet } from 'react-native';
import GlobalState from '../state';
// import { db } from '../api';

const ListScreen = ({navigation}) => {

  const [text, setText] = useState('');
  const { state, actions } = useContext(GlobalState.Context);

  // useEffect(() => {
  //   const todosRef = db.ref('/todos');
  //   todosRef.once('value')
  //     .then((dataSnapshot) => {
  //       console.log(dataSnapshot.val());
  //       // dataSnapshot.forEach(function(doc) {
  //       //   // doc.data() is never undefined for query doc snapshots
  //       //   console.log(doc.id, " => ", doc.data());
  //       // });
  //     });
  //   const catsRef = db.ref('/categories');
  //   catsRef.once('value')
  //     .then((dataSnapshot) => {
  //       console.log(dataSnapshot.val());
  //       // dataSnapshot.forEach(function(doc) {
  //       //   // doc.data() is never undefined for query doc snapshots
  //       //   console.log(doc.id, " => ", doc.data());
  //       // });
  //     });
  //
  // }, []);

  const addNewTodo = () => {
    const [id, title] = [`${ Math.round(Math.random() * new Date().getTime()) }`, text];
    // db.ref('/todos').push({
    //   done: false,
    //   title,
    //   id,
    // });
    console.log('Action!', 'A new To-do item was created');
    actions.addTodo({ title, id });
    clearText();
  };

  const clearText = () => {
    setText('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') { // todo: this is for Web, add onEndEditing for mobile
      addNewTodo();
    }
  }

  return (
    <ThemeProvider>
      <Input
        rightIcon={ <Icon
          name='add'
          type='ion-icon'
          color='#517fa4'
        /> }
        onChangeText={ setText }
        onKeyPress={ handleKeyPress }
        containerStyle={ styles.inputStyle }
        style={ styles.inputStyle }
        value={ text }
      />
      <TodoList list={ state.todos }/>
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
