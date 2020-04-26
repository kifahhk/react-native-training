import React, { useState } from 'react';
import { ListItem, CheckBox, Text } from 'react-native-elements';
import { StyleSheet } from 'react-native';

const TodoItem = ({ listItem }) => {
  const [ done, setDone ] = useState(listItem.done);

  const title = (
    <Text style={ styles.titleStyle }>{ listItem.title }</Text>
  );

  return (
    <ListItem
      title={ listItem.title }
      titleStyle={ done ?  {
        textDecoration: 'line-through',
      } : { } }
      rightElement={ <CheckBox
        checked={ done }
        onPress={ () => setDone(!done) }
      /> }
      bottomDivider
    />
  );
};

export default TodoItem;

const styles = StyleSheet.create({
  titleStyle: {
    textDecoration: 'line-through',
  },
});
