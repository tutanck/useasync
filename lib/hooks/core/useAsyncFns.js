/* eslint-disable prefer-arrow-callback */
import { useState } from 'react';

import { safe } from '../../utils/index.js';

export default function useAsyncFns({ trackId, debug = false }, ...asyncFns) {
  const [state, setState] = useState({});

  const mergeIndexState = (
    index,
    indexStateUpdate,
    { incrementCallsCount = false } = {}
  ) =>
    setState((previousState) => {
      const previousIndexState = previousState[index];
      const { id, callsCount } = safe(previousIndexState, {});
      const safeCallsCount = safe(callsCount, 0);

      if (debug && trackId === id)
        console.log(`previous${index}State`, previousIndexState);

      const newIndexState = {
        ...previousIndexState,
        ...indexStateUpdate,
        callsCount: incrementCallsCount ? safeCallsCount + 1 : safeCallsCount,
      };

      if (debug && trackId === id)
        console.log(`new${index}State`, newIndexState);

      return {
        [index]: newIndexState,
      };
    });

  const processes = asyncFns.map(function wrapper(asyncFn, index) {
    //

    const handle =
      (id) =>
      async (...args) => {
        mergeIndexState(
          index,
          { id, args, status: 'loading', error: null },
          { incrementCallsCount: true }
        );

        /* TODO 
      promisify (asyncFn)
        when #transparentPromisify 
          is done
      */
        return asyncFn(...args)
          .then((data) => {
            mergeIndexState(index, { data, status: 'done', error: null });

            return data;
          })
          .catch((error) => {
            mergeIndexState(index, { error, status: 'error' });

            throw error;
          });
      };

    const { args, data, error, status, callsCount } = safe(state[index], {});

    return [handle, args || [], data, error, status, callsCount];
  });

  return processes;
}
