import React, { createContext } from 'react';
import { bool, func, node } from 'prop-types';

const RunContext = createContext({});

function RunProvider({ children, onError, preferTrack = false }) {
  return (
    <RunContext.Provider
      value={{
        onError,
        preferTrack,
      }}
    >
      {children}
    </RunContext.Provider>
  );
}

RunProvider.propTypes = {
  onError: func,
  preferTrack: bool,
  children: node,
};

export { RunContext, RunProvider };
