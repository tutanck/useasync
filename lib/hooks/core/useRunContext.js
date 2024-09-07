import { useContext } from 'react';

import { RunContext } from '../../contexts/RunContext.js';

const useRunContext = () => useContext(RunContext);

export default useRunContext;
