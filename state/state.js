import React, { createContext } from 'react';
import useState from './use-state';

const GlobalState = (useValue) => {
  const Context = createContext(null);

  const Provider = ({ children, defaultState }) => {
    const value = useValue(defaultState);

    return <Context.Provider value={value}>{children}</Context.Provider>;
  };

  return {
    Context,
    Provider,
  };
}

export default GlobalState(useState);
