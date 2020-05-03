import React, { useEffect, useState } from 'react';
import { AuthUserContext } from '../session';
import { withFirebase } from '../firebase';
import MessageList from './message-list';
import { View, Text } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';

const Messages = ({ firebase }) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const limit = 10;
  let unsubscribe = null;

  const listenToMessages = () => {
    setLoading(true);

    unsubscribe = firebase
      .messages()
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .onSnapshot(snapshot => {
        if (snapshot.size) {
          const newMessages = [];
          snapshot.forEach(doc =>
            newMessages.push({ ...doc.data(), uid: doc.id }),
          );

          setMessages(newMessages.reverse());
        } else {
          setMessages([]);
        }
        setLoading(false);
      });
  }

  useEffect(() => {
    listenToMessages();
  }, []);

  useEffect(() => {
    return () => {
      unsubscribe();
    };
  }, []);

  const onCreateMessage = (event, authUser) => {
    firebase.messages().add({
      text,
      userId: authUser.uid,
      createdAt: firebase.fieldValue.serverTimestamp(),
    });

    setText('');

    event.preventDefault();
  };

  const onEditMessage = (message, text) => {
    const { uid, ...messageSnapshot } = message;

    firebase.message(message.uid).update({
      ...messageSnapshot,
      text,
      editedAt: firebase.fieldValue.serverTimestamp(),
    });
  };

  const onRemoveMessage = uid => {
    firebase.message(uid).delete();
  };

  return (
    <AuthUserContext.Consumer>
      { authUser => (
        <View>
          { loading && <Text>Loading ...</Text> }

          { messages && (
            <MessageList
              authUser={ authUser }
              messages={ messages }
              onEditMessage={ onEditMessage }
              onRemoveMessage={ onRemoveMessage }
            />
          ) }

          { !messages && <Text>There are no messages ...</Text> }

          <Input
            rightIcon={ <Icon
              name='add'
              type='ion-icon'
              color='#517fa4'
            /> }
            onChangeText={ setText }
            value={ text }
          />
          <Button title="Send" onPress={ (e) => onCreateMessage(e, authUser) }/>
        </View>
      ) }
    </AuthUserContext.Consumer>
  );
};

export default withFirebase(Messages);
