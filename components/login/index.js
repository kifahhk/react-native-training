import React, { Component, useState } from 'react';
import { compose } from 'recompose';
import { View, Text } from 'react-native';
import { withFirebase } from '../firebase';
import * as ROUTES from '../../constants/routes';
import { Icon, Input, Button } from 'react-native-elements';
import ListScreen from '../../screens/list-screen';

const LogInPage = ({navigation}) => (
  <div>
    <h1>Login</h1>
    <LogInForm navigation={navigation}/>
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS =
  'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

const SignInFormBase = ({ navigation, firebase }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const isInvalid = password === '' || email === '';

  const onSubmit = event => {
    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        // this.setState({ ...INITIAL_STATE });
        navigation.navigate(ROUTES.HOME);
      })
      .catch(error => {
        setError(error);
      });

    event.preventDefault();
  };


  return (
    <View>
      <Input
        rightIcon={ <Icon
          name='mail'
          type='ion-icon'
          color='#517fa4'
        /> }
        onChangeText={ setEmail }
        value={ email }
        textContentType="text"
        placeholder="Email"
      />
      <Input
        rightIcon={ <Icon
          name='lock'
          type='ion-icon'
          color='#517fa4'
        /> }
        onChangeText={ setPassword }
        value={ password }
        textContentType="password"
        placeholder="Password"
      />
      <Button title="Sign In" onPress={ onSubmit } disabled={ isInvalid } />
      { error && <Text>{ error.message }</Text> }
    </View>
  );
};


const LogInForm = compose(
  withFirebase,
)(SignInFormBase);


export default LogInPage;

export { LogInForm };
