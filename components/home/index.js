import React from 'react';
import { compose } from 'recompose';
import { View, Text } from 'react-native';
import { withAuthentication, withEmailVerification } from '../session';
import Messages from '../messages';

const HomePage = () => (
  <View>
    <Text>Home Page</Text>
    <Text>The Home Page is accessible by every signed in user.</Text>

    <Messages />
  </View>
);

export default compose(
  withEmailVerification,
  withAuthentication,
)(HomePage);
// todo refactoring 3 sections and commit ^^