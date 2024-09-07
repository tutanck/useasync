import useTrunk from './core/useTrunk.js';
import useErrorEffect from './core/useErrorEffect.js';

export default function useError(errors, onError) {
  const [state, handle] = useTrunk(onError);

  useErrorEffect(handle, errors);

  return state;
}
