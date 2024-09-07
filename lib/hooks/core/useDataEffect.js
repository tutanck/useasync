import { useEffect } from 'react';

import { isFunction } from '../../utils/index.js';

export default function useDataEffect(onData, deps) {
  useEffect(() => {
    if (!(deps && Array.isArray(deps)))
      throw new Error(
        `'data' should be an array but its value is ${deps ?? 'not defined'}`
      );

    if (!isFunction(onData))
      throw new Error(
        `'onError' should be a function but its value is ${
          onData ?? 'not defined'
        }`
      );

    onData(...deps);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
