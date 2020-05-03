import React, { useEffect } from 'react';
import { compose } from 'recompose';

import AuthUserContext from './context';
import { withFirebase } from '../firebase';
import * as ROUTES from '../../constants/routes';

const withAuthorization = condition => Component => {

  const XXX = ({navigation, firebase}) => {
    let listener = null;

    useEffect(() => {
      listener = firebase.onAuthUserListener(
        authUser => {
          console.log("listener", authUser, condition(authUser));
          if (!condition(authUser)) {
            navigation.navigate(ROUTES.LOG_IN);
          }
        },
        () => navigation.navigate(ROUTES.LOG_IN),
      );

    }, []);

    useEffect(() => {
      return () => {
        listener();
      };
    }, []);

    const ret = authUser => {
      console.log("return", authUser, condition(authUser))
      return condition(authUser) ? <Component { ...this.props } /> : null
    };

    return (
      <AuthUserContext.Consumer>
        { ret }
      </AuthUserContext.Consumer>
    );
  };

  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          console.log("listener", authUser, condition(authUser));
          if (!condition(authUser)) {

            this.props.navigation.navigate(ROUTES.LOG_IN);
          }
        },
        () => this.props.navigation.navigate(ROUTES.LOG_IN),
      );
    }

    componentWillUnmount() {
      this.listener();
    }



    render() {
      const ret = authUser => {
        console.log("return", authUser, condition(authUser))
        return condition(authUser) ? <Component { ...this.props } /> : null
      };

      return (
        <AuthUserContext.Consumer>
          { ret }
        </AuthUserContext.Consumer>
      );
    }
  }

  return compose(
    withFirebase,
  )(XXX);
};

export default withAuthorization;
