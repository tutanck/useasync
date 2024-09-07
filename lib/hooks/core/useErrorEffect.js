import { useEffect } from 'react';

import { isFunction } from '../../utils/index.js';

export default function useErrorEffect(onError, errors) {
  useEffect(() => {
    if (!(errors && Array.isArray(errors)))
      throw new Error(
        `'errors' should be an array but its value is ${
          errors ?? 'not defined'
        }`
      );

    if (!isFunction(onError))
      throw new Error(
        `'onError' should be a function but its value is ${
          onError ?? 'not defined'
        }`
      );

    const filteredErrors = errors.filter((err) => !!err);

    if (filteredErrors.length) {
      onError(...filteredErrors);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, errors);
}
