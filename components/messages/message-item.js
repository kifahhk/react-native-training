import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button, Input, ListItem } from 'react-native-elements';

const MessageItem = ({ authUser, message, onRemoveMessage, onEditMessage }) => {
  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState(message.text);

  const onToggleEditMode = () => {
    setEditMode(!editMode);
    setEditText(message.text);
  };

  const onSaveEditText = () => {
    onEditMessage(message, editText);

    setEditMode(false);
  };

  const rightEl =

    authUser.uid === message.userId && (
      <View>
        { editMode ? (
          <View>
            <Button title="Save" onPress={ onSaveEditText }/>
            <Button title="Reset" onPress={ onToggleEditMode }/>
          </View>
        ) : (
          <Button title="Edit" onPress={ onToggleEditMode }/>
        ) }

        { !editMode && (
          <Button
            title="Delete"
            onPress={ () => onRemoveMessage(message.uid) }
          />
        ) }
      </View>
    );

  const leftEl =
    editMode ? (
      <Input
        type="text"
        value={ editText }
        onChangeText={ setEditText }
      />
    ) : (
      <View>
        <Text>
          <Text style={ styles.bold }>{ message.userId }</Text> { message.text }
          { message.editedAt && <Text>(Edited)</Text> }
        </Text>
      </View>
    );

  return (
    <ListItem
      title={ leftEl }
      rightElement={ rightEl }
    />
  );

};

export default MessageItem;

const styles = StyleSheet.create({
  bold: {
    fontWeight: 'bold'
  }
});
