import useTrunk from './core/useTrunk.js';
import useDataEffect from './core/useDataEffect.js';

export default function useData(deps, onData) {
  const [state, handle] = useTrunk(onData);

  useDataEffect(handle, deps);

  return state;
}
