import useAsync from '../useAsync.js';
import { promisify } from '../../utils/index.js';
import useRunContext from './useRunContext.js';

export default function useTrunk(cb) {
  const { preferTrack } = useRunContext();

  const asyncFn = promisify(cb);

  const state = useAsync(asyncFn);

  const handle = preferTrack ? state.handle : state[1];

  return [state, handle];
}
