export default function isFunction(fn) {
  const fnType = typeof fn;

  return fn && fnType === 'function';
}
