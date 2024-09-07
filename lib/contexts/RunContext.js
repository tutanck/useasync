import { createContext, createElement } from 'react';
import { bool, func, node } from 'prop-types';

const RunContext = createContext({});

function RunProvider({ children, onError, preferTrack = false }) {
  const props = {
    value: {
      onError,
      preferTrack,
    },
  };

  return createElement(RunContext.Provider, {
    ...props,
    children,
  });
}

RunProvider.propTypes = {
  onError: func,
  preferTrack: bool,
  children: node,
};

export { RunContext, RunProvider };
