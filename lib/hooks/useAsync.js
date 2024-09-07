import { useState } from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import ShortUniqueId from 'short-unique-id';

import useAsyncFns from './core/useAsyncFns.js';
import useRunContext from './core/useRunContext.js';
import useErrorEffect from './core/useErrorEffect.js';
import safeErrorContext from '../utils/safeErrorContext.js';
import { isIDLE, isDone, isError, isLoading } from '../utils/is.js';

const uid = new ShortUniqueId();

export default function useAsync(asyncFn, givenId, { debug = false } = {}) {
  const trackId = givenId || uid.seq();

  const [id] = useState(trackId);

  const { onError, preferTrack } = useRunContext();

  const [[handle, args, data, error, status, callsCount]] = useAsyncFns(
    { trackId, debug },
    asyncFn
  );

  useErrorEffect(safeErrorContext(onError), [error]);

  const is = [
    isLoading(status),
    isDone(status),
    isError(status),
    isIDLE(status),
  ];

  const trackedHandle = handle(id);

  const track = {
    id,
    is,
    args,
    data,
    error,
    status,
    callsCount,
    handle: trackedHandle,
    isTrack: true,
  };

  const list = [data, trackedHandle, is, error, args, status, callsCount, id];

  return preferTrack ? track : list;
}
