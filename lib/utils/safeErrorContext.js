import noOp from './noOp.js';
import isContextEmpty from './isContextEmpty.js';

export default function safeErrorContext(context, stub = noOp) {
  if (isContextEmpty(context)) return stub;

  return context;
}
